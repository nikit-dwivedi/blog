const express = require('express');
const router = express.Router();


const db=require("../v1/config/mongodb");

const blogRoute = require('./routes/blog.route');

router.use('/blogs', blogRoute);

module.exports = router;