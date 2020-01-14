
const address = {
  "address": "clarine-hermann-629dc2"
}

const emails = {
  "emails": [
    {
        "id": 3,
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        "from": "[{\"address\":\"teddy.ph.leung@gmail.com\",\"name\":\"Teddy Leung\"}]",
        "subject": "Testing Testing",
        "sent_at": "2020-01-08T17:43:23.000Z",
        "has_attachments": true,
        "is_read": false
    },
    {
        "id": 13,
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        "from": "[{\"address\":\"teddy.ph.leung@gmail.com\",\"name\":\"Teddy Leung\"}]",
        "subject": "Testing Testing",
        "sent_at": "2020-01-08T17:43:23.000Z",
        "has_attachments": true,
        "is_read": false
    },
    {
        "id": 44,
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        "from": "[{\"address\":\"teddy.ph.leung@gmail.com\",\"name\":\"Teddy Leung\"}]",
        "subject": "Testing Testing",
        "sent_at": "2020-01-08T17:43:23.000Z",
        "has_attachments": true,
        "is_read": true
    }
  ]
}

const emailUrl = {
  "storage_url": "https://dontatme-emails.s3.us-west-2.amazonaws.com/mt6vl3oko69vqju3q52tflgc92kvlsrpa3rm8mg1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5FSBVOO77A6LQA5J%2F20200114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200114T000609Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=a2cabb7773577f61e362d3f76001e7bef6c06fc658c5a4b3b2ca0a10377b1226"
}

export default {
  delete: jest.fn(() => {
    return Promise.resolve({
      status: 200
    });
  }),

  put: jest.fn(() => {
    return Promise.resolve({
      status: 200,
    });
  }),

  get: jest.fn((url) => {
    if (url === '/addresses/clarine-hermann-629dc2/emails') {
      return Promise.resolve({
        status: 200,
        data: emails
      });
    }

    if (url === '/addresses/clarine-hermann-629dc2/emails/3') {
      return Promise.resolve({
        status: 200,
        data: emailUrl
      });
    }
  }),

  post: jest.fn(() => {
    return Promise.resolve({
      status: 200, 
      data: address
    })
  })
}
