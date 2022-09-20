interface IQueries {
  [key: string]: string;
}

const queries = {
  test: `SELECT NOW()`,

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
        /*createDttm AND create_dttm >= ':createDttm'::TIMESTAMPTZ createDttm*/;
  `,
} as IQueries;

export default queries;
