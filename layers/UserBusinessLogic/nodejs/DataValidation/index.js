const Joi = require('joi');

exports.DataValidation = () => {
  const Validator = Joi;

  const emailRuleValidation = () => {
    return {
      validate: () => Validator.string().email().required(),
      create: () =>
        Validator.string().email({ minDomainSegments: 2 }).required(),
    };
  };

  const passwordRuleValidation = () => {
    return {
      validate: () => Validator.string().required(),
      create: () => Validator.string().required(),
    };
  };

  const nameRuleValidation = () =>
    Validator.string().alphanum().min(3).max(50).required();

  return {
    /**
     * Validate body to create user
     *
     * @name toCreateUser
     * @method  POST/signup
     *
     * @param  {object} params - Parameters for data validation
     * @param   {object} params.body - Body to validate
     *
     */
    toCreateUser: (params) =>
      new Promise(async (resolve, reject) => {
        try {
          const { body } = params;

          await Validator.object({
            body: Validator.object({
              email: emailRuleValidation().create(),
              password: passwordRuleValidation().create(),
              name: nameRuleValidation(),
            }),
          }).validateAsync({ body });

          resolve({ message: 'OK' });
        } catch (err) {
          reject(err);
        }
      }),
    /**
     * Validate body to sign in user
     *
     * @name toCreateUser
     * @method  POST/signin
     *
     * @param  {object} params - Parameters for data validation
     * @param   {object} params.body - Body to validate
     *
     */
    toSignInUser: (params) =>
      new Promise(async (resolve, reject) => {
        try {
          const { body } = params;

          await Validator.object({
            body: Validator.object({
              email: emailRuleValidation().validate(),
              password: passwordRuleValidation().validate(),
            }),
          }).validateAsync({ body });

          resolve({ message: 'OK' });
        } catch (err) {
          reject(err);
        }
      }),
    /**
     * Validate body to update user data
     *
     * @name toUpdateUserData
     * @method  PUT/user/:email
     *
     * @param  {object} params - Parameters for data validation
     * @param   {object} params.body - Body to validate
     *
     */
    toUpdateUserData: (params) =>
      new Promise(async (resolve, reject) => {
        try {
          const { body } = params;

          await Validator.object({
            body: Validator.object({
              name: nameRuleValidation(),
            }),
          }).validateAsync({ body });

          resolve({ message: 'OK' });
        } catch (err) {
          reject(err);
        }
      }),
  };
};
