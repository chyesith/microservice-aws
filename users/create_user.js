"use strict";
const AWS = require("aws-sdk1");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: context.awsRequestId,
      name: data.name,
      age: data.age,
      role: data.role,
      createdTime: new Date().getTime(),
      updatedTime: new Date().getTime(),
    },
  };

  dynamoDb.put(params, (errors) => {
    if (error) {
      console.log.error(error);
      callback(new Error("can not create user"));
      return;
    }

    const response = {
      statusCode: 201,
      body: JSON.stringify(body.Item),
    };
    callback(null, response);
  });
};
