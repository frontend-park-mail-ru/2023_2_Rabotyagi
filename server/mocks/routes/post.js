const allPosts = require('./posts')

module.exports = [
  {
    id: "posts", //route id
    url: "/api/v1/post/get_list:count", // url in express format
    method: [ "GET" ], // HTTP methods
    variants: [
      {
        id: "enabled", // variant id
        type: "middleware", // variant of type "middleware"
        options: {
          middleware: (req, res, next, core) => { // middleware to use
            res.status(200);
            const data = allPosts.slice(0,req.params.count);
            res.body(data);
            res.send();
          },
        },
      },
      {
        id: "disabled", // variant id
        disabled: true,
      },
    ],
  },
];
