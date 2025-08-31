// Fetch all registered providers
export async function fetchProviders(): Promise<Provider[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/providers`);
        if (!response.ok) {
            throw new Error(`Failed to fetch providers (${response.status}: ${response.statusText})`);
        }
        const data = await response.json();
        return data.providers || [];
    } catch (error) {
        console.error('Error fetching providers:', error);
        throw error instanceof Error ? error : new Error('Failed to fetch providers');
    }
}
// API base URL
// Determine API base URL with multiple fallback strategies
// 1. Window runtime config (for container/runtime injection)
// 2. Build-time env var (Webpack DefinePlugin)
// 3. Same-origin relative path (assumes reverse proxy)
// 4. Local development default
// In reverse proxy mode we rely on path prefixes served by a gateway:
// /api -> central api, /dhb -> DHB service, /pharmacy -> pharmacy service
// Runtime config/env can still override; defaults are path prefixes (same-origin)
// In reverse proxy setup, use path prefixes that the gateway maps to real services.
// Gateway (nginx) will proxy /api -> central_api, /dhb -> dhb service, /pharmacy -> toniq service.
// Local dev can still override with env vars if desired.
const API_BASE_URL = (
    (typeof window !== 'undefined' && (window as any).__CONFIG__?.API_BASE_URL) ||
    (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) ||
    '/api'
);
const DHB_API_URL = (
    (typeof window !== 'undefined' && (window as any).__CONFIG__?.DHB_API_BASE_URL) ||
    (typeof process !== 'undefined' && process.env?.REACT_APP_DHB_API_URL) ||
    '/dhb'
);
const PHARMACY_API_URL = (
    (typeof window !== 'undefined' && (window as any).__CONFIG__?.PHARMACY_API_BASE_URL) ||
    (typeof process !== 'undefined' && (process.env as any)?.REACT_APP_PHARMACY_API_URL) ||
    '/pharmacy'
);

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

export async function clearAllProviders() {
    try {
        const response = await fetch(`${API_BASE_URL}/providers`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(
                data?.message ||
                `Failed to clear providers (${response.status}: ${response.statusText})`
            );
        }

        return await response.json();
    } catch (error) {
        console.error('Error clearing providers:', error);
        throw error instanceof Error ? error : new Error('Failed to clear providers');
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
            `${API_BASE_URL}/patients/${nhi}/medications?current=${current}`
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
            `${API_BASE_URL}/patients/${nhi}/blood-tests?${params}`
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
