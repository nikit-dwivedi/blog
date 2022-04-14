const blogModel = require("../models/blog.models");


async function getBlogDetailsById(id) {
    const blogDetails = await blogModel.findById(id);
    return blogDetails ? blogDetails : [];
}

async function getBlogDetailsBycategory(category) {
    const blogDetails = await blogModel.find({ "category" : category });
    return blogDetails ? blogDetails : "notFound";
}
async function getAllBlog() {
    const blogDetails = await blogModel.find();
    return blogDetails ? blogDetails : "notFound";
}




module.exports = {
    getBlogDetailsById,
    getBlogDetailsBycategory,
    getAllBlog
}