exports.DynamoDBService = ({ DataBase, tableName }) => {
  const TableName = tableName;
  const Table = DataBase;
  /**
   *  Convert a JavaScript object into a DynamoDB record.
   *
   * @name marshallData
   *
   * @param  {object} data - Data to convert
   *
   * @return {object} Converted data
   *
   */
  const marshallData = (data) => Table.Converter.marshall(data);

  return {
    /**
     * Insert a single documents in a collection
     *
     * @name insertOne
     *
     * @param  {object} params - Parameters for data insertion
     * @param  {object} params.data - Data to be inserted
     *
     * @return {object} Data confirmation
     *
     */
    insertOne: async (params) =>
      new Promise(async (resolve, reject) => {
        try {
          const { data } = params;

          const marshalledData = marshallData(data);

          const params = {
            TableName,
            Item: marshalledData,
            ReturnValues: 'ALL_OLD',
            ConditionExpression: 'attribute_not_exists(pk)',
          };

          await Table.putItem(params).promise();

          resolve({ message: 'OK' });
        } catch (err) {
          reject(err);
        }
      }),
    /**
     * Find user by primary key
     *
     * @name findUserByPk
     *
     * @param  {object} params - Parameters for data insertion
     * @param  {string} params.pk
     *
     * @return {object} Updated document
     *
     */
    findUserByPk: async (params) =>
      new Promise(async (resolve, reject) => {
        try {
          const { pk } = params;
          const sk = 'user';

          const marshalledKey = marshallData({
            pk,
            sk,
          });

          const params = {
            TableName,
            Key: marshalledKey,
          };

          const { Item } = await Table.getItem(params).promise();

          resolve({ data: Item });
        } catch (err) {
          reject(err);
        }
      }),
    /**
     * Update a single document in a collection
     *
     * @name findOneByIdAndUpdate
     *
     * @param  {object} params - Parameters for data insertion
     * @param  {string} params.pk
     * @param  {object} params.data
     *
     * @return {object} Updated document
     *
     */
    findUserByPkAndUpdate: async (params) =>
      new Promise(async (resolve, reject) => {
        try {
          const { pk, data } = params;
          const sk = 'user';

          const marshalledKey = marshallData({ email: pk, sk });
          const marshalledData = marshallData(data);

          const params = {
            TableName,
            Key: marshalledKey,
            Item: marshalledData,
            ReturnValues: 'ALL_OLD',
          };

          const { Item } = await Table.putItem(params).promise();

          resolve({ data: Item });
        } catch (err) {
          reject(err);
        }
      }),
     /**
     * Delete a single document in a collection
     *
     * @name deleteUserByPk
     *
     * @param  {object} params - Parameters for data insertion
     * @param  {string} params.pk
     *
     * @return {object} Updated document
     *
     */
    deleteUserByPk: async (params) =>
      new Promise(async (resolve, reject) => {
        try {
          // to do
          const { pk } = params;
          const sk = 'user';

          const marshalledKey = marshallData({ email: pk, sk });

          const params = {
            TableName,
            Key: marshalledKey
          };

          const { Item } = await Table.deleteItem(params).promise();

          resolve({ data: Item });
        } catch (err) {
          reject(err);
        }
      }),
  };
};
