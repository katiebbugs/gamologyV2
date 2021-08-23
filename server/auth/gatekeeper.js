const  Users  = require('../db/models')

const requireToken = async(req,res,next) => {
    try {
      const token = req.headers.authorization;
      const user = await Users.findByToken(token)
      req.user = user
      console.log('Require Token', req.user.id)
      next()
    } catch (error) {
      next(error)
    }
  }

  module.exports = {
      requireToken
  }