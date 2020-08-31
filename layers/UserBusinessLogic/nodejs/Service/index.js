exports.Service = ({ DB }) => {
  // Data base
  const MainTable = DB;

  const roles = {
    user: 'user',
    admin: 'admin',
  };

  return {
    /**
     * Create new user entity
     *
     * @name createUser
     * @method  POST/user
     *
     * @param  {object} params - Parameters for data creation
     * @param   {object} params.data - Data that is created
     *
     * @return {object} Data creation confirmation message
     *
     */
    createUser: async (params) =>
      new Promise(async (resolve, reject) => {
        try {
          const { data } = params;
          const dateNow = new Date().toISOString();

          const userData = {
            ...data,
            role: roles.user,
            lastUpdateDate: dateNow,
            createDate: dateNow,
          };

          const creatResponse = await MainTable.insertOne({
            data: userData,
          });

          resolve({ message: creatResponse.message, data: userData });
        } catch (err) {
          reject(err);
        }
      }),
    /**
     * Sign in user by credentials
     *
     * @name signInUser
     * @method  POST/signin
     *
     * @param  {object} params - Parameters for data creation
     * @param   {string} params.email - User email
     *
     * @return {object} User data
     *
     */
    getUserDataByEmail: async (params) =>
      new Promise(async (resolve, reject) => {
        try {
          const { email } = params;

          const userData = await MainTable.findUserByPkAndUpdate({
            pk: email,
          });

          resolve({ data: userData.data });
        } catch (err) {
          reject(err);
        }
      }),
    /**
     * Modify existing user data
     *
     * @name modifyUserDataByEmail
     * @method  PUT/user/:email
     *
     * @param  {object} params - Parameters for data update
     * @param  {string} params.email - The email of te user
     * @param  {object} params.data - Data that is modified
     *
     * @return {object} Updated data
     *
     */
    modifyUserDataByEmail: async (params) =>
      new Promise(async (resolve, reject) => {
        try {
          const { email, data } = params;

          const updatedUser = await MainTable.findUserByPkAndUpdate({
            pk: email,
            data,
          });

          resolve({ data: updatedUser.data });
        } catch (err) {
          reject(err);
        }
      }),
    /**
     * Delete user by email
     *
     * @name deleteUserByEmail
     * @method  DELETE/user/:email
     *
     * @param  {object} params - Parameters for data update
     * @param  {string} params.email - The email of te user
     *
     * @return {object} Deleteion message confirmation
     *
     */
    deleteUserDataByEmail: async (params) =>
      new Promise(async (resolve, reject) => {
        try {
          const { email } = params;

          const deleteResponse = await MainTable.deleteUserByPk({
            pk: email,
          });

          resolve({ data: deleteResponse.data });
        } catch (err) {
          reject(err);
        }
      }),
  };
};
