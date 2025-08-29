interface Provider {
    providerId: string;
    baseUrl: string;
    name: string;
}

export async function registerProvider(provider: Provider) {
    try {
        const response = await fetch(`${API_BASE_URL}/providers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(provider),
        });

        if (!response.ok) {
            throw new Error(`Failed to register provider: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering provider:', error);
        throw error;
    }
}
