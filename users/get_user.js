"use strict";
const AWS = require("aws-sdk1");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params, (errors, result) => {
    if (error) {
      console.log.error(error);
      callback(new Error("can not fetch user"));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
