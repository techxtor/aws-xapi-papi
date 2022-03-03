const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const axios = require("axios");
const eventbridge = new AWS.EventBridge();

function putEventInEventBridge() {

    const detail = {
    state: "started"
  };
  
    var params = {
      Entries: [
        {
          Detail: JSON.stringify(detail),
          DetailType: 'random',
          Source: 'random-number-papi'
        },
      ]
    };

    console.log(params);
    return eventbridge.putEvents(params).promise();
  }
  
exports.handler = async (event) => {
    try {
    await axios.get("https://jsonplaceholder.typicode.com/todos/1")
    .then(res => console.log(res.data));
    } catch (e) {
        console.log("Manish", e);
    }
    const data = await putEventInEventBridge();
    console.log(data);
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
