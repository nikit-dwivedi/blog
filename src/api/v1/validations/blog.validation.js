const { body, param } = require('express-validator')


exports.validateBlog = (method) => {
  switch (method) {
    case 'add': {
      return [
        body('title', 'Title is Required').not().isEmpty().trim().escape(),
        body('short_description', 'Short_description is Required').not().isEmpty().trim().escape(),
        body('long_description', 'Long_description is Required').not().isEmpty().trim().escape(),
        body('category', 'Category is Required').not().isEmpty().trim().escape(),
      ]
    }
    case 'getById': {
      return [
        param('id', 'Invalid Blog ID').not().isEmpty().trim().escape().isLength({min:24,max:24}),
      ]
    }
    case 'getByCategory': {
      return [
        param('category', 'Invalid category').not().isEmpty().trim().escape(),
      ]
    }
    case 'update': {
      return [
        param('_id', 'Invalid Blog ID').not().isEmpty().trim().escape().isLength({min:24,max:24}),
        body('title', 'Title is Required').not().isEmpty().trim().escape(),
        body('short_description', 'Short_description is Required').not().isEmpty().trim().escape(),
        body('long_description', 'Long_description is Required').not().isEmpty().trim().escape(),
        body('category', 'Category is Required').not().isEmpty().trim().escape(),
      ]
    }
    case 'delete': {
      return [
        param('id', 'Invalid Blog ID').not().isEmpty().trim().escape().isLength({min:24,max:24}),
      ]
    }
  }
}

