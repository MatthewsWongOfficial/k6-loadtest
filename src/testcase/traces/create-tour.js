import { AbstractScenario } from '../abstract-scenario.js';
import { Http } from '../../../lib/http.js';
import { AssertionsHelper } from '../../../lib/assertions-helper.js';
import { generateAuthToken } from '../../../workers/keycloak/auth.js';
import exec from 'k6/x/exec'; 
import { logger } from '../../../workers/logger.js';

class CreateTourScenario extends AbstractScenario {
    constructor() {
        super();
        this.http = new Http();
        this.assertionsHelper = new AssertionsHelper();
        this.endpoint = 'https://traces-service-ontego-de.commsult.dev/tdp/api/v1/tours';
        this.requestName = 'Create Tour';
        this.authToken = null;
    }

    setup() {
        // Generate the Keycloak token
        this.authToken = generateAuthToken();
        logger.info('Keycloak token generated successfully');
    }

    execute() {
        // Run the external script and capture output
        const execResult = exec.command('node', ['C:\\Users\\Matthews\\Downloads\\k6-load-test\\k6-load-test\\workers\\randomize-location\\main.js']);
    const output = execResult ? execResult.stdout : null;

    if (!output) {
        console.error("ERROR: No output from main.js or output is undefined");
        return;
    }

    try {
        const parsedData = JSON.parse(output);
        console.log("Parsed Data:", parsedData);
    } catch (error) {
        console.error("ERROR: Invalid JSON format in output from main.js", error);
    }

        
        // Attempt to parse the output as JSON
        let tourData;
        try {
            tourData = JSON.parse(output);
        } catch (error) {
            logger.error('Failed to parse tour data as JSON:', output);
            throw new Error('Invalid JSON format in output from main.js');
        }
        
        const headers = {
            Authorization: `Bearer ${this.authToken}`,
            'Content-Type': 'application/json',
        };
        
        logger.info(`Executing ${this.requestName} with generated tour data`, tourData);
        
        // Send POST request to create the tour
        const response = this.http.sendPostRequest(this.endpoint, JSON.stringify(tourData), { headers });
        
        // Assertions and logging
        this.assertionsHelper.assertResponseStatus(response, 201, this.requestName);
        logger.info(`${this.requestName} completed with status: ${response.status}`);
        
        if (response.status !== 201) {
            logger.error(`Failed ${this.requestName} response:`, response.body);
        } else {
            logger.info(`Tour created successfully. Response data: ${response.body}`);
        }
    }
}

// Run the scenario
export default function() {
    const createTourScenario = new CreateTourScenario();
    createTourScenario.setup();  // Set up the token
    createTourScenario.execute();  // Execute the test scenario
}
