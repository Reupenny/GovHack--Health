// Fallback to default URLs if env vars are not set
const API_BASE_URL = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL) || 'http://localhost:3000';
const DHB_API_URL = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_DHB_API_URL) || 'http://localhost:3001';

export interface Provider {
    providerId: string;
    name: string;
    baseUrl: string;
}

export async function registerProvider(provider: Provider) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(provider),
        });

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(
                data?.message ||
                `Failed to register provider (${response.status}: ${response.statusText})`
            );
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering provider:', error);
        throw error instanceof Error ? error : new Error('Failed to register provider');
    }
}

export async function fetchPatientData(nhi: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/patients/${nhi}`);
        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(
                data?.message ||
                `Failed to fetch patient data (${response.status}: ${response.statusText})`
            );
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching patient data:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch patient data');
    }
}

export async function fetchMedications(nhi: string, current: boolean = false) {
    try {
        const response = await fetch(
            `${DHB_API_URL}/patients/${nhi}/medications?current=${current}`
        );
        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(
                data?.message ||
                `Failed to fetch medications (${response.status}: ${response.statusText})`
            );
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching medications:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch medications');
    }
}

export async function fetchBloodTests(
    nhi: string,
    from?: string,
    to?: string,
    limit: number = 20
) {
    try {
        const params = new URLSearchParams({
            ...(from && { from }),
            ...(to && { to }),
            limit: limit.toString()
        });

        const response = await fetch(
            `${DHB_API_URL}/patients/${nhi}/blood-tests?${params}`
        );
        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(
                data?.message ||
                `Failed to fetch blood tests (${response.status}: ${response.statusText})`
            );
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching blood tests:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch blood tests');
    }
}

export async function fetchDocuments(
    nhi: string,
    type?: string,
    from?: string,
    to?: string,
    limit: number = 20
) {
    try {
        const params = new URLSearchParams({
            ...(type && { type }),
            ...(from && { from }),
            ...(to && { to }),
            limit: limit.toString()
        });

        const response = await fetch(
            `${DHB_API_URL}/patients/${nhi}/documents?${params}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch documents');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
    }
}
