// Use this file only as a guide for first steps using middleware variants. You can delete it when you have understood the concepts.
// For a detailed explanation about using middlewares, visit:
// https://mocks-server.org/docs/usage/variants/middlewares
const allPosts = require('./posts')

module.exports = [
  {
    id: "posts", //route id
    url: "/api/v1/post/get_list", // url in express format
    method: "*", // HTTP methods
    variants: [
      {
        id: "enabled", // variant id
        type: "json", // variant handler id
        options: {
          status: 200,
          // Express middleware to execute
          body: allPosts
        },
      },
      {
        id: "disabled", // variant id
        disabled: true,
      },
    ],
  },
];
