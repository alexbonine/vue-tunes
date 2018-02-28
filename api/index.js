const express = require('express');

// Create express router
const router = express.Router();

// // Transform req & res to have the same API as express
// // So we can use res.status() & res.json()
// var app = express();
// router.use((req, res, next) => {
//   Object.setPrototypeOf(req, app.request);
//   Object.setPrototypeOf(res, app.response);
//   req.res = res;
//   res.req = req;
//   next();
// });

// Add POST - /api/login
router.post('/register', (req, res) => {
  req.session.accessToken = req.body.accessToken;
  res.status(200);
});

router.post('*', (req, res) => {
  console.log(req);
});

module.exports = {
  path: '/api',
  handler: router,
};
