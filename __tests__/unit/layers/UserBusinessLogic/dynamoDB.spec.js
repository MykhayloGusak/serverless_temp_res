const {
  DynamoDBService,
} = require('../../../../layers/UserBusinessLogic/nodejs/DynamoDB');
const faker = require('faker');

describe.skip('>> DynamoDBService <module>', () => {
  let fakeDynamoDBWorks,
    fakeDynamoDBFails,
    serviceWorks,
    serviceFails,
    testTableName;
  beforeAll(() => {
    testTableName = 'test';
    fakeDynamoDBWorks = () => {
      return {
        putItem: (params) => {
          console.log(params);
          return { promise: () => Promise.resolve() };
        },
      };
    };

    fakeDynamoDBFails = () => {
      return {
        putItem: ({ data }) => {
          return Promise.reject({ message: 'test error' });
        },
      };
    };

    serviceWorks = DynamoDBService({
      DB: fakeDynamoDBWorks(),
      tableName: testTableName,
    });

    serviceFails = DynamoDBService({
      DB: fakeDynamoDBFails(),
      tableName: testTableName,
    });
  });

  describe('> createUser({ data })', () => {
    let data, dateNow;
    beforeEach(() => {
      dateNow = new Date().toISOString();
      data = {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        password: faker.internet.password(),
        role: 'user',
        lastUpdateDate: dateNow,
        createDate: dateNow,
      };
    });
    describe('successful cases', () => {
      it('When all properties generates successfully, then message "OK" and new created properties is returned', async () => {
        //Arrange
        let dataToPass = data;
        // to do
        // Act
        const createRes = await serviceWorks.insertOne({
          data: dataToPass,
        });

        //Assert
        expect(createRes.message).toBe('OK');
        expect(createRes.data.email).toBe(bodyToPass.email);
        expect(createRes.data.name).toBe(bodyToPass.name);
        expect(createRes.data.password).toBe(bodyToPass.password);
        expect(createRes.data.role).toBe('user');
        expect(createRes.data.createDate).toBeDefined();
        expect(createRes.data.lastUpdateDate).toBeDefined();
      });
    });
    describe('fails when', () => {
      it('data flow fails, then error is returned', async () => {
        try {
          // to do
          //Arrange
          let dataToPass = data;

          // Act
          const validationRes = await serviceFails.createUser({
            data: dataToPass,
          });

          //Assert
          expect(validationRes).toBeUndefined();
        } catch (err) {
          expect(err.message).toBe(`test error`);
        }
      });
    });
  });
});
