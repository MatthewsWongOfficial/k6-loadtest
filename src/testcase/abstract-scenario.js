import { Http } from '../../lib/http.js';
import { AssertionsHelper } from '../../lib/assertions-helper.js';
import { generateAuthToken } from '../../workers/keycloak/auth.js';
import { logger } from '../../workers/logger.js';

export class AbstractScenario {
    constructor() {
        this.http = new Http({ 'Content-Type': 'application/json' });
        this.assertionsHelper = new AssertionsHelper();
        this.authToken = null;
    }

    async authenticate() {
        if (!this.authToken) {
            this.authToken = await generateAuthToken();
            logger.info(`Authentication token generated successfully.`);
        }
    }

    setAuthorizationHeaders() {
        if (this.authToken) {
            this.http.baseHeaders['Authorization'] = `Bearer ${this.authToken}`;
        }
    }

    async setup() {
        await this.authenticate();
        this.setAuthorizationHeaders();
    }

    runScenario() {
        throw new Error('runScenario method not implemented');
    }
}
