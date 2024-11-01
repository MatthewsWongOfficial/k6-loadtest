import http from 'k6/http';
import { check, sleep } from 'k6';
import { fail } from 'k6';

// Maximum retries and delay between retries
const MAX_RETRIES = 3;
const RETRY_DELAY = 1; // in seconds

// Environment variables for credentials
const CLIENT_ID = __ENV.CLIENT_ID || 'glc-traces-tracking-spa-stage';
const CLIENT_SECRET = __ENV.CLIENT_SECRET || '80HFGGyt1EJ9uTQSqFJl477hUmSUneAj';
const USERNAME_OVERRIDE = __ENV.USERNAME_OVERRIDE || 'behn';
const PASSWORD = __ENV.PASSWORD || '0Jyh3Y&4i';
const TOKEN_ENDPOINT = __ENV.TOKEN_ENDPOINT || 'https://identity-ontego-de.commsult.dev/realms/otg-traces/protocol/openid-connect/token';

// Function to generate the Keycloak authentication token
export function generateAuthToken() {
    let attempt = 0;
    let response;
    const payload = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'password',
        username: USERNAME_OVERRIDE,
        password: PASSWORD,
    };

    // Retry mechanism
    while (attempt < MAX_RETRIES) {
        response = http.post(TOKEN_ENDPOINT, payload, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        // Check if the response has a valid token
        if (response.status === 200 && response.json('access_token')) {
            return response.json('access_token');
        }

        attempt++;
        sleep(RETRY_DELAY); // wait before retrying
    }

    fail('Failed to obtain auth token after multiple attempts');
}
