const {
  DataValidation,
} = require('../../../../layers/UserBusinessLogic/nodejs/DataValidation');
const faker = require('faker');
const dataValidation = DataValidation();

describe('DataValidation module', () => {
  describe('> toCreateUser()', () => {
    let body;
    beforeEach(() => {
      body = {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        password: faker.internet.password(),
      };
    });
    describe('successful cases when', () => {
      it('body is correct, then validation is successful', async () => {
        try {
          //Arrange
          let bodyToValidate = body;

          // Act
          const validationRes = await dataValidation.toCreateUser({
            body: bodyToValidate,
          });

          //Assert
          expect(validationRes.message).toBe('OK');
        } catch (err) {
          expect(err).toBeUndefined();
        }
      });
    });
    describe('validation fails when', () => {
      describe('body.email<string> ', () => {
        it('email has invalid format', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.email = 'email.com';

            // Act
            const validationRes = await dataValidation.toCreateUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.email" must be a valid email`);
          }
        });
        it('email is undefined', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.email = undefined;

            // Act
            const validationRes = await dataValidation.toCreateUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.email" is required`);
          }
        });
        it('email is of incorrect type <number>', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.email = 123;

            // Act
            const validationRes = await dataValidation.toCreateUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.email" must be a string`);
          }
        });
      });
      describe('body.name<string>', () => {
        it('name is undefined', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.name = undefined;

            // Act
            const validationRes = await dataValidation.toCreateUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.name" is required`);
          }
        });
        it('name is of incorrect type <number>', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.name = 123;

            // Act
            const validationRes = await dataValidation.toCreateUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.name" must be a string`);
          }
        });
      });
      describe('body.password<string>', () => {
        it('password is undefined', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.password = undefined;

            // Act
            const validationRes = await dataValidation.toCreateUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.password" is required`);
          }
        });
        it('password is of incorrect type <number>', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.password = 123;

            // Act
            const validationRes = await dataValidation.toCreateUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.password" must be a string`);
          }
        });
      });
    });
  });
  describe('> toSignInUser()', () => {
    let body;
    beforeEach(() => {
      body = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
    });
    describe('successful cases when', () => {
      it('body is correct, then validation is successful', async () => {
        try {
          //Arrange
          let bodyToValidate = body;

          // Act
          const validationRes = await dataValidation.toSignInUser({
            body: bodyToValidate,
          });

          //Assert
          expect(validationRes.message).toBe('OK');
        } catch (err) {
          expect(err).toBeUndefined();
        }
      });
    });
    describe('validation fails when', () => {
      describe('body.email<string> ', () => {
        it('email has invalid format', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.email = 'email.com';

            // Act
            const validationRes = await dataValidation.toSignInUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.email" must be a valid email`);
          }
        });
        it('email is undefined', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.email = undefined;

            // Act
            const validationRes = await dataValidation.toSignInUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.email" is required`);
          }
        });
        it('email is of incorrect type <number>', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.email = 123;

            // Act
            const validationRes = await dataValidation.toSignInUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.email" must be a string`);
          }
        });
      });
      describe('body.password<string>', () => {
        it('password is undefined', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.password = undefined;

            // Act
            const validationRes = await dataValidation.toSignInUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.password" is required`);
          }
        });
        it('password is of incorrect type <number>', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.password = 123;

            // Act
            const validationRes = await dataValidation.toSignInUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.password" must be a string`);
          }
        });
      });
      describe('body.notAllowedValue fails when', () => {
        it('more properties are passed', async () => {
          try {
            //Arrange
            let bodyToValidate = body;
            body.notAllowedValue = 'value';

            // Act
            const validationRes = await dataValidation.toSignInUser({
              body: bodyToValidate,
            });

            //Assert
            expect(validationRes).toBeUndefined();
          } catch (err) {
            expect(err.message).toBe(`"body.notAllowedValue" is not allowed`);
          }
        });
      });
    });
  });
});
