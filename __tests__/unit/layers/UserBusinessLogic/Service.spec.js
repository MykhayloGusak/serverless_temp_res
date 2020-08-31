const {
  Service,
} = require('../../../../layers/UserBusinessLogic/nodejs/Service');
const faker = require('faker');

describe('Service module', () => {
  let dataBaseToWork, dataBaseToFails, serviceWorks, serviceFails;
  beforeAll(() => {
    dataBaseToWork = () => {
      return {
        insertOne: () => {
          return Promise.resolve({ message: 'OK' });
        },
      };
    };

    dataBaseToFails = () => {
      return {
        insertOne: ({ data }) => {
          return Promise.reject({ message: 'test error' });
        },
      };
    };

    serviceWorks = Service({
      DB: dataBaseToWork(),
    });

    serviceFails = Service({
      DB: dataBaseToFails(),
    });
  });

  describe('> createUser({ data })', () => {
    let body;
    beforeEach(() => {
      body = {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        password: faker.internet.password(),
      };
    });
    describe('successful cases', () => {
      it('When all properties generates successfully, then message "OK" and new created properties is returned', async () => {
        //Arrange
        let bodyToPass = body;

        // Act
        const createRes = await serviceWorks.createUser({
          data: bodyToPass,
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
          //Arrange
          let bodyToValidate = body;
          body.email = 'email.com';

          // Act
          const validationRes = await serviceFails.createUser({
            data: bodyToValidate,
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
