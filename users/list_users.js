"use strict";
const AWS = require("aws-sdk1");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};
module.exports.list = (event, context, callback) => {
  dynamoDb.scan(params, (errors, result) => {
    if (error) {
      console.log.error(error);
      callback(new Error("can not fetch user"));
      return;
    }

    const response = {
      statusCode: 201,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
