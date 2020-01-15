const simpleParser = require('mailparser').simpleParser;
const axios = require('axios');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const getFirstBit = (body) => {
  return body.split('\n')[0].slice(0, 201);
};

const createEmailJson = (parsed, s3Key) => ({
  body: getFirstBit(parsed.text),
  from: JSON.stringify(parsed.from.value),
  subject: parsed.subject,
  sent_at: parsed.date,
  has_attachments: parsed.attachments.length > 0,
  storage_url: s3Key
});

exports.handler = async (event) => {
  const message = event.Records[0].Sns.Message;
  const msgJson = JSON.parse(message);
  const { bucketName, objectKey } = msgJson.receipt.action;
  
  const params = {
    Bucket: bucketName, 
    Key: objectKey, 
  };
  
  const email = await s3.getObject(params).promise();
  
  const parsedEmail = await simpleParser(email.Body);
  
  const emailJson = createEmailJson(parsedEmail, objectKey);
  
  // TODO: Does not account for multiple destination addresses with mixed domains
  //  (e.g., [other@gmail.com, one@dontatme.ca])
  // or multiple destinations where there are more than one that's from our domain 
  // (e.g., [one@dontatme.ca, two@dontatme.ca])
  const addressId = parsedEmail.to.value[0].address.split('@')[0];
  
  const parsedEmailString = JSON.stringify(parsedEmail);
  
  const putParams = {
    Body: parsedEmailString, 
    Bucket: bucketName, 
    Key: `${objectKey}.json`
  };
  
  const saveItemResponse = await s3.putObject(putParams).promise();
  
  console.log(saveItemResponse);
  console.log(emailJson);
  
  // const serverRes = await axios.post(process.env.DAM_URL + `/addresses/${addressId}/emails`, emailJson);
  
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};