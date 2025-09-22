import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import Cookies from 'js-cookie';


export default function Cart() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [makePayment, setMakePayment] = useState(null)

    const [userId, setuserId] = useState(null)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [finalOrders, setFinalOrders] = useState([])

    const [cartDetails, setCartDetails] = useState({
        foodItems: [],  // Food items added to the cart
        email: '',  // User's email
        quantity: 1,  // Quantity of items
    });

    // const userId = userData?.data?.id;

    useEffect(() => {
        window.scrollTo(0, 0);

        axios.get(`${API_BASE_URL}/check-authentication/`, { withCredentials: true })
            .then(response => {
                console.log("(Menu) Response Data:", response.data);
                setUserData(response.data);
                setuserId(response.data.data.id)
            })
            .catch(error => {
                // navigate('/');
                alert("Please! Login first or Create Account on our website")
                console.error("There was an error fetching the data!", error);
            });

        const fetchCartItems = async () => {
            try {
                if (!userId) {
                    throw new Error('User ID is null or undefined');
                }
                else {

                    console.log(userId);
                    const response = await axios.get(`${API_BASE_URL}/cart/?user_id=${userId}`);
                    console.log(response.data);
                    setCartItems(response.data);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch cart items');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchCartItems();
        }


        const fetchFinalOrders = async () => {
            try {
                if (!userId) {
                    throw new Error('User ID is null or undefined');
                } else {
                    console.log(userId);
                    const response = await axios.get(`${API_BASE_URL}/final-orders/`, { withCredentials: true });
                    console.log(response.data);
                    setFinalOrders(response.data); // Store final orders in the state
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch final orders');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchFinalOrders();
        }
    }, [navigate, userId]);


    const handleRemoveFromCart = async (itemId) => {
        try {
            const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from cookies

            await axios.post(
                `http://localhost:8000/api/remove-cart/`,
                { item_id: itemId },
                {
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': csrfToken // Include CSRF token in the headers
                    }
                }
            );
            setCartItems(cartItems.filter(item => item.id !== itemId)); // Update local state
        } catch (err) {
            console.error('Error removing item from cart:', err);
        }
    };


    const handleConfirmOrder = (id) => {
        const ask_confirm = window.confirm("Do you want to confirm and process? After Confirm you cannot cancel it.");
        console.log(id);
        if (ask_confirm) {
            axios.post(`${API_BASE_URL}/confirm/`, {
                user_id: id,
            }, { withCredentials: true })
                .then(response => {
                    console.log('Orders confirmed:', response.data);
                    setMakePayment(response.data);  // Handle the success case
                })
                .catch(error => console.error('Error confirming orders:', error));
        }
        window.location.reload()
    };



    if (!userData) {
        return null;  // Return null if user data isn't loaded yet
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div>
            <div className="container mt-4">
                <h4 className="card-title text-dark text-center">Cart Items</h4>

                {cartItems.length > 0 ? (
                    <div className="row">
                        {cartItems.map((item, index) => (
                            <div className="col-md-6" key={index}>
                                <div className="mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className='text-warning text-center'>{item.cart_details.name}</h5>
                                            <ul className="list-group">
                                                <li className="list-group-item text-center"><strong>{item.cart_details.title}</strong></li>
                                                <li className="list-group-item"><strong>{item.cart_details.text}</strong></li>
                                                <li className="list-group-item"><strong>Price:</strong> ${item.cart_details.price}</li>
                                                <li className="list-group-item"><strong>Quantity:</strong> {item.quantity}</li>
                                                <li className="list-group-item"><strong>Rating:</strong> {item.cart_details.rating}</li>
                                                <li className="list-group-item"><strong>Timing:</strong> {item.cart_details.time}</li>
                                                <li className="list-group-item"><strong>Last Updated:</strong> {new Date(item.last_updated).toLocaleString()}</li>
                                                <li className="list-group-item"><strong>Ordered Status:</strong> {item.ordered ? "Yes" : "No"}</li>
                                            </ul>
                                            <div className="mt-3 text-center">
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleRemoveFromCart(item.id)}
                                                >
                                                    Remove from Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div>
                            <button
                                className="btn btn-md w-100 btn-success "
                                onClick={() => handleConfirmOrder(userId)}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <li className="list-group-item">No items found.</li>
                    </div>
                )}

                <br />
                <h4 className='text-center text-warning'>Previous Orders</h4>

                <div className="row">
                    {finalOrders.map((order, index) => (
                        <div className="col-md-6" key={index}>
                            <div className="mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className='text-warning text-center'>Order ID: {order.id}</h5>
                                        <ul className="list-group">
                                            <li className="list-group-item text-center"><strong>Item ID:</strong> {order.item_id}</li>
                                            <li className="list-group-item"><strong>Title:</strong> {order.order_details.title}</li>
                                            <li className="list-group-item"><strong>Description:</strong> {order.order_details.text}</li>
                                            <li className="list-group-item"><strong>Price:</strong> ${order.order_details.price}</li>
                                            <li className="list-group-item"><strong>Quantity:</strong> {order.quantity}</li>
                                            <li className="list-group-item"><strong>Rating:</strong> {order.order_details.rating}</li>
                                            <li className="list-group-item"><strong>Timing:</strong> {order.order_details.time}</li>
                                            <li className="list-group-item"><strong>Ordered At:</strong> {new Date(order.ordered_at).toLocaleString()}</li>
                                            <li className="list-group-item"><strong>Payment Status:</strong> {order.payment_status}</li>
                                            <li className="list-group-item"><strong>Order Status:</strong> {order.order_status}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}