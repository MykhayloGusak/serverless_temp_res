const { DynamoDB } = require('aws-sdk');
const Table = new DynamoDB({ region: 'us-east-1' });

const { Service } = require('/opt/nodejs/Service');
const { DataValidation } = require('/opt/nodejs/DataValidation');
const { DynamoDBService } = require('/opt/nodejs/DynamoDB');

const DataBase = Service({
  DB: DynamoDBService({
    DataBase: DynamoDB,
    tableName: rocess.env.TABLE_NAME,
  }),
});

const BodyValidation = DataValidation({});

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.handler = async (event) => {
  let response;
  try {
    const body = JSON.parse(event.body);

    await BodyValidation.toCreateUser({ data: body });

    const bodyResponse = await DataBase.createUser({
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
