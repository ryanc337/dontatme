const simpleParser = require('mailparser').simpleParser;
const axios = require('axios');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const getFirstBit = (body) => {
  return body.split('\n')[0].slice(0, 201);
};

const createEmailJson = async (email, s3Key) => {
  try {
    const parsed = await simpleParser(email);

    return {
      body: getFirstBit(parsed.text),
      from: JSON.stringify(parsed.from.value),
      subject: parsed.subject,
      sent_at: parsed.date,
      has_attachments: parsed.attachments.length > 0,
      storage_url: s3Key
    };
  } catch (err) {
    console.log(err);
  }
};

exports.handler = async (event) => {
  const message = event.Records[0].Sns.Message;
  const msgJson = JSON.parse(message);
  const { bucketName, objectKey } = msgJson.receipt.action;
  
  const params = {
    Bucket: bucketName, 
    Key: objectKey, 
  };
  
  const email = await s3.getObject(params).promise();
  
  const emailJson = await createEmailJson(email.Body, objectKey);
  
  console.log(emailJson);
  
  const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};