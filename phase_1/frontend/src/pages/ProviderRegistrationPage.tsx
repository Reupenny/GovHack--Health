import React from 'react';
import { registerProvider, clearAllProviders } from '../api';
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
                                    providerId: 'South_Island_Health_Service',
                                    name: 'South Island Health Service',
                                    baseUrl: 'https://oyi4jwlu2s74brzah3effulx3i0dlexu.lambda-url.ap-southeast-2.on.aws'
                                });
                                alert('DHB provider registered successfully!');
                                window.location.href = '/';
                            } catch (error) {
                                alert('Failed to register DHB provider: ' + (error instanceof Error ? error.message : 'Unknown error'));
                            }
                        }}
                    >
                        Quick Register Regional Health Service Provider
                    </button>

                    <button
                        className="quick-register-button"
                        onClick={async () => {
                            try {
                                await registerProvider({
                                    providerId: 'GovHack_Pharmacy',
                                    name: 'GovHack Pharmacy',
                                    baseUrl: 'https://fpsmmuwjil6aqcmgluipbr7kxm0onchb.lambda-url.ap-southeast-2.on.aws'
                                });
                                alert('GovHack Pharmacy registered successfully!');
                                window.location.href = '/';
                            } catch (error) {
                                alert('Failed to register GovHack Pharmacy: ' + (error instanceof Error ? error.message : 'Unknown error'));
                            }
                        }}
                    >
                        Quick Register Pharmacy Service Provider
                    </button>

                    <button
                        className="quick-register-button clear-button"
                        onClick={async () => {
                            try {
                                const result = await clearAllProviders();
                                alert(`All providers cleared successfully! Cleared ${result.clearedCount} providers.`);
                                window.location.href = '/';
                            } catch (error) {
                                alert('Failed to clear providers: ' + (error instanceof Error ? error.message : 'Unknown error'));
                            }
                        }}
                    >
                        Clear All Providers
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
