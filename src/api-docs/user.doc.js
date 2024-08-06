/* eslint-disable */
const login = {
  tags: ["Users"],
  description: "User Login",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            Name_User: {
              type: "string",
              description: "username of the user",
              example: "etumwesigye",
            },
            password: {
              type: "string",
              description: "password of user",
              example: "123",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "User succesfully logged in ",
    },
    400: {
      description: "Bad request",
    },
    500: {
      description: "Internal server error",
    },
  },
};

const getUser = {
    tags: ["Users"],
    description: "get the user by id",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "user id",
        type: "number",
        example: "1",
      },
    ],
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
            },
          },
        },
      },
      404: {
        description: "User not found",
      },
    },
  }
  const listOfAllUsers = {
    
    tags:["Users"],
    description: "list of all users",
    // security: [
    //     {
    //       auth_token: [],
    //     },
    //   ],
    responses:{
        200:{
            description:"OK",
            content:{
                "application/json":{
                    schema:{
                        type:"object",
                      

                    },
                },
            },
        },
    },
};
const userRouteDoc = {
  "/user/login": {
    post: login,
  },
  "/user/allUsers": {
    get: listOfAllUsers,
  },
  "/user/user/{id}": {
    get: getUser,
  },
};

export default userRouteDoc;
