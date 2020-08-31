const { DynamoDB, KMS } = require('aws-sdk');

const region = 'us-east-1';

const Table = new DynamoDB({ region });
const Kms = new KMS({ region });

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

    await BodyValidation.toSignInUser({ body });

    const { data } = await DataBase.getUserDataByEmail({
      email: body.email,
    });

    response = {
      statusCode: 200,
      body: JSON.stringify(data),
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
