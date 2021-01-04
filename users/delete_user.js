"use strict";
const AWS = require("aws-sdk1");
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.delete(params, (errors) => {
    if (error) {
      console.log.error(error);
      callback(new Error("can not delete user"));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(),
    };
    callback(null, response);
  });
};
