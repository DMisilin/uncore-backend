interface IQueries {
  [key: string]: string;
}

const queries = {
  testQuery: `SELECT NOW()`,

  // =======================================
  // ############# Create some #############
  // =======================================

  createRequest: `
    INSERT INTO 
        request (
            request_id,
            user_id, 
            type_id, 
            activity_id, 
            title, 
            description, 
            country_id, 
            city_id
            ) 
    VALUES (
        ':requestId',
        ':userId', 
        ':typeId', 
        ':activityId', 
        ':title', 
        ':description', 
        :countryId, 
        :cityId
        )
    RETURNING 
        request_id AS "requestId";`,

  createResponse: `
    INSERT INTO 
        request_user (
            request_user_id, 
            request_id, 
            user_id
            )
    VALUES (
        ':requestUserId', 
        ':requestId', 
        ':userId'
        );`,

  // =======================================
  // ############# Return some #############
  // =======================================

  getRequests: `
    SELECT
        request_id AS "requestId",
        user_id AS "userId",
        activity_id AS "activityId",
        title,
        description,
        country_id AS "countryId",
        city_id AS "cityId",
        create_dttm AS "createDttm",
        modify_dttm AS "modifyDttm",
        status
    FROM 
        request
    WHERE
        TRUE
        /*requestId AND request_id = ':requestId' requestId*/
        /*userId AND user_id = ':userId' userId*/
        /*typeId AND type_id = :typeId typeId*/
        /*activityId AND activity_id = :activityId activityId*/
        /*countryId AND country_id = :countryId countryId*/
        /*cityId AND city_id = :cityId cityId*/
        /*status AND status = ':status' status*/
        /*createDttm AND create_dttm >= ':createDttm'::TIMESTAMPTZ createDttm*/;`,

  // =======================================
  // ############# Modify some #############
  // =======================================

  modifyRequest: `
    UPDATE
        request
    SET
        modify_dttm = NOW()
        /*typeId ,type_id = :typeId typeId*/
        /*activityId ,activity_id = :activityId activityId*/
        /*title ,title = ':title' title*/
        /*description ,description = ':description' description*/
        /*countryId ,country_id = :countryId countryId*/
        /*cityId ,city_id = :cityId cityId*/
    WHERE
        request_id = ':requestId';`,

} as IQueries;

export default queries;
