import React from 'react';
import { ProviderRegistrationForm } from '../components/ProviderRegistrationForm';
import { registerProvider } from '../api';
import './ProviderRegistrationPage.css';

export const ProviderRegistrationPage: React.FC = () => {
    return (
        <div className="provider-registration-page">
            <div className="header">
                <h1>OpenHealth Provider Registration</h1>
                <p>Register your healthcare organization to join the OpenHealth network</p>
            </div>

            <div className="content">
                <div className="form-container">
                    <button
                        className="quick-register-button"
                        onClick={async () => {
                            try {
                                await registerProvider({
                                    providerId: 'DHB_1',
                                    name: 'Local DHB',
                                    baseUrl: 'http://localhost:3001'
                                });
                                alert('DHB provider registered successfully!');
                                window.location.href = '/';
                            } catch (error) {
                                alert('Failed to register DHB provider: ' + (error instanceof Error ? error.message : 'Unknown error'));
                            }
                        }}
                    >
                        Quick Register DHB Provider
                    </button>
                </div>

                <div className="info-section">
                    <h2>Benefits of Registration</h2>
                    <ul>
                        <li>Connect with the OpenHealth network</li>
                        <li>Share patient data securely</li>
                        <li>Improve patient care coordination</li>
                        <li>Access consolidated health records</li>
                    </ul>

                    <h2>Requirements</h2>
                    <ul>
                        <li>Valid healthcare provider ID</li>
                        <li>Secure API endpoint (HTTPS required)</li>
                        <li>OpenHealth API compatibility</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
