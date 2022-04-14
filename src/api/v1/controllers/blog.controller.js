/*----------------------------------------validator-------------------------------------------------------*/
const { validationResult } = require('express-validator');
/*----------------------------------------models-------------------------------------------------------*/
const blogModel   = require("../models/blog.models")
/*----------------------------------------helpers-------------------------------------------------------*/
const { success, unknownError, serverValidation, badRequest } = require('../helpers/response.helper');
const {getAllBlog,getBlogDetailsBycategory,getBlogDetailsById} = require('../helpers/blog.helper');


/*----------------------------------------functions-------------------------------------------------------*/



module.exports = {

    addBlog: async (req,res) =>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                    let data = {
                    title:req.body.title,
                    short_description:req.body.short_description,
                    long_description:req.body.long_description,
                    category:req.body.category,
                    image:req.file
                }
                let blog = new blogModel(data)
                await blog.save((err)=>{
                    if (err){
                        console.log(err)
                        badRequest(res,"something is wrong")
                    }else{
                        success(res,"Blog created successfully",data)
                    }
                })
                }        
        
        } catch (error) {
            console.log(error)
            unknownError(res, error);
        }
    },
    getAll: async(req,res) =>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                    const data = await getAllBlog()
                    if (data[0]=== undefined) {
                        badRequest(res,"No blog found")
                    }else{
                        success(res, 'Success',data);
                    }
                }        
        
        } catch (error) {
            unknownError(res, error);
        }
    },
    getById: async(req,res) =>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                    const data = await getBlogDetailsById(req.params.id)
                    if (data._id === undefined ) {
                        badRequest(res,"Blog not found")
                    }else{
                        success(res, 'Success',data);
                    }
                }        
        
        } catch (error) {
            unknownError(res, error);
        }
    },
    getByCategory: async(req,res) =>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                    const data = await getBlogDetailsBycategory(req.params.category)
                    if (data[0]=== undefined) {
                        badRequest(res,"Blog not found")
                    }else{
                        success(res, 'Success',data);
                    }
                }        
        
        } catch (error) {
            console.log(error)
            unknownError(res, error);
        }
    },
    updateBlog: async(req,res) =>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                let editData = {
                    "title":req.body.title,
                    "short_description":req.body.short_description,
                    "long_description":req.body.long_description,
                    "category":req.body.category,
                    "image":req.file
                }
                    const data = await blogModel.findByIdAndUpdate(req.params._id,editData)
                    if (data === null) {
                        badRequest(res,'Blog not found')
                    }else{
                        success(res, 'Successfully Updated',editData);
                    }
                }        
        
        } catch (error) {
            unknownError(res, error);
        }
    },
    removeBlog: async(req,res) =>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                serverValidation(res, { errorName: "serverValidation", errors: errors.array() })
            } else {
                    const data = await blogModel.findByIdAndDelete(req.params.id)
                    if (data === null) {
                        badRequest(res,'Blog not found')
                    }else{
                        success(res, 'Blog deleted',data);
                    }
                }        
        } catch (error) {
            unknownError(res, error);
        }
    }

};
