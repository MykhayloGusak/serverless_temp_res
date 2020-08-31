// AWS Services
const { DynamoDB } = require('aws-sdk');

// Service logic layer
const { Service } = require('/opt/nodejs/Service');
const { DataValidation } = require('/opt/nodejs/DataValidation');
const { DynamoDBService } = require('/opt/nodejs/DynamoDB');

// Executes Service logic layer
const DataBase = Service({
  DB: DynamoDBService({
    DataBase: new DynamoDB({ region: 'us-east-1' }),
    tableName: rocess.env.TABLE_NAME,
  }),
});

const BodyValidation = DataValidation({});

exports.handler = async (event) => {
  let response;
  try {
    const body = JSON.parse(event.body);

    await BodyValidation.toCreateUser({ body });

    const bodyResponse = await DataBase.toSignInUser({
      data: body,
    });

    response = {
      statusCode: 200,
      body: JSON.stringify(bodyResponse),
    };
  } catch (err) {
    console.warn(err);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
    };
  } finally {
    return response;
  }
};
