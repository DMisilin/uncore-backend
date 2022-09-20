```
openapi: 3.0.0
servers:
  # Added by API Auto Mocking Plugin
  - description: Request API
    url: https://virtserver.swaggerhub.com/radarApp/Some/1.0.0
info:
  version: "1.0.0"
  title: requests
  description: The API for the Request service
paths:
  /create-request:
    post:
      tags:
        - Request
      operationId: create request
      description: create request
      responses:
        '200':
          description: successfully create request
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateRequest'
  /get-requests:
    post:
      tags:
        - Request
      operationId: get requests
      description: return request by params
      responses:
        '200':
          description: successfully
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GetRequests'
  /modify-request:
    post:
      tags:
        - Request
      operationId: modify requests
      description: modify request by params
      responses:
        '200':
          description: successfully
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ModifyRequests'
  /create-response:
    post:
      tags:
        - Response
      operationId: create response
      description: create response
      responses:
        '200':
          description: successfully create response
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateResponse'
components:
  schemas:
    CreateRequest:
      type: object
      required:
        - userId
        - typeId
        - activityId
        - title
        - description
      properties:
        userId:
          type: string
          format: uuid
          example: 0729a580-2240-11e6-9eb5-0002a5d5c51b
        typeId:
          type: integer
          format: int32
        activityId:
          type: integer
          format: int32
        title:
          type: string
        description:
          type: string
        countryId:
          type: integer
          format: int32
        cityId:
          type: integer
          format: int32
    ModifyRequests:
      type: object
      required:
        - requestId
      properties:
        requestId:
          type: string
          format: uuid
          example: 0729a580-2240-11e6-9eb5-0002a5d5c51b
        typeId:
          type: integer
          format: int32
        activityId:
          type: integer
          format: int32
        title:
          type: string
        description:
          type: string
        countryId:
          type: integer
          format: int32
        cityId:
          type: integer
          format: int32
    GetRequests:
      type: object
      properties:
        userId:
          type: string
          format: uuid
          example: 0729a580-2240-11e6-9eb5-0002a5d5c51b
        typeId:
          type: integer
          format: int32
        activityId:
          type: integer
          format: int32
        countryId:
          type: integer
          format: int32
        cityId:
          type: integer
          format: int32
        status:
          type: string
          enum:
            - created
            - approved
            - active
            - completed
        createDttm:
          type: string
          format: date
    CreateResponse:
      type: object
      required:
        - userId
        - requestId
      properties:
        userId:
          type: string
          format: uuid
          example: 0729a580-2240-11e6-9eb5-0002a5d5c51b
          description: User who create response
        requestId:
          type: string
          format: uuid
          example: 0729a580-2240-11e6-9eb5-0002a5d5c51b
```