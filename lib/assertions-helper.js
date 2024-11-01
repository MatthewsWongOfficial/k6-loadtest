import { check } from 'k6';

export class AssertionsHelper {
    assertResponseStatus(response, expectedStatus, requestName = '') {
        const assertionName = requestName 
            ? `Verify ${requestName} response status is ${expectedStatus}` 
            : `Verify response status is ${expectedStatus}`;

        return check(response, {
            [assertionName]: (r) => r.status === expectedStatus,
        });
    }

    assertResponseContainsText(response, expectedText) {
        const assertionName = `Verify response body contains text: "${expectedText}"`;

        return check(response, {
            [assertionName]: (r) => r.body && r.body.includes(expectedText),
        });
    }

    assertSingleResourceResponseBodyStructure(responseJson, requestName = '') {
        return check(responseJson, {
            [`Verify ${requestName} response body has 'data'`]: (json) => json.data !== undefined,
            [`Verify ${requestName} response body has 'data.attributes'`]: (json) => json.data.attributes !== undefined,
        });
    }

    assertRequestDurationIsLowerOrEqualTo(response, maxDuration) {
        return check(response, {
            [`Response duration is <= ${maxDuration}ms`]: (r) => r.timings.duration <= maxDuration,
        });
    }
}
