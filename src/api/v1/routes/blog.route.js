const express = require('express');
const router = express.Router();
const { validateBlog} = require("../validations/blog.validation")


//----------task------------------------------------------------------------------
const blogController = require('../controllers/blog.controller');
const upload = require('../middleware/upload');



router.post('/',upload.single('image'),validateBlog('add'),blogController.addBlog);   
router.get('/',blogController.getAll);
router.get('/category/:category',validateBlog('getByCategory'),blogController.getByCategory);
router.get('/:id', validateBlog('getById'),blogController.getById);
router.put('/edit/:_id', upload.single('image'),validateBlog('update'),blogController.updateBlog);
router.delete('/remove/:id',validateBlog('delete'),blogController.removeBlog)


module.exports = router;