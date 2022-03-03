var AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
exports.handler = async (event) => {
    console.log(event);
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(event),
    };
    return response;
};
