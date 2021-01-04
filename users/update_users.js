"use strict";
const AWS = require("aws-sdk1");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    key: {
      id: event.pathParameters.id,
    },
    Item: {
      id: context.awsRequestId,
      name: data.name,
      age: data.age,
      role: data.role,
      createdTime: new Date().getTime(),
      updatedTime: new Date().getTime(),
    },
  };

  dynamoDb.get(params, (errors, result) => {
    if (error) {
      console.log.error(error);
      callback(new Error("can not fetch user"));
      return;
    }

    if (result.Item) {
      dynamoDb.put(params, (errors) => {
        if (error) {
          console.log.error(error);
          callback(new Error("can not update user"));
          return;
        }

        const response = {
          statusCode: 204,
          body: JSON.stringify(params.Item),
        };
        callback(null, response);
      });
    }
  });
};
