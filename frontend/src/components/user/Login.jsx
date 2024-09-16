// src/components/LoginModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../../config"

export default function Login() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');

    const [userData, setUserData] = useState(null);

    const [loading, setLoading] = useState(false);  // New loading state

    // go on top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // for carousel slides
    useEffect(() => {
        axios.get(`${API_BASE_URL}/check-authentication/`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching carousel data!", error);
            });
    }, []);

    const handleSendOtp = async () => {
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/send-otp/`, { email: email }, { withCredentials: true });
            if (response) {
                setOtpSent(true);
                setError('');
            }
        } catch (error) {
            setError('Failed to send OTP');
        } finally {
            setLoading(false);  // Stop loading after request
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/verify-otp/`, {
                email: email,
                otp: otp
            });
            if (response.status === 200) {
                alert('OTP verified');
            }
        } catch (error) {
            setError('Invalid OTP');
        }
    };

    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="loginModalLabel">Log in</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {!otpSent ? (
                            <div className="p-3 mb-4">
                                <label htmlFor="email" className="form-label">Enter your Email</label>
                                <input
                                    id='email'
                                    type="email"
                                    className="form-control mb-3"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success w-100 mb-2"
                                    onClick={handleSendOtp}
                                >
                                    {loading ? (
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        "Send OTP"
                                    )}
                                </button>
                                {error && <p className="text-danger mt-2">{error}</p>}
                            </div>

                        ) : (
                            <div>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button type="button" className="btn btn-primary w-100" onClick={handleVerifyOtp}>Verify OTP</button>
                                <button type="button" className="btn btn-link w-100 mt-2" onClick={() => setOtpSent(false)}>Resend OTP</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

