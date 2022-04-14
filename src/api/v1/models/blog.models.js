const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    image:{type:Object,default:""},
    title: {type: String, required: [true, 'Title should not be empty']},
    short_description: {type: String, required: [true, 'Short description should not be empty']},
    long_description: {type: String, required: [true, 'Long description should not be empty']},
    category: {type: String, required: [true, 'Category should not be empty']}
});

const blogModel = mongoose.model('portfolio', blogSchema);

module.exports = blogModel;
