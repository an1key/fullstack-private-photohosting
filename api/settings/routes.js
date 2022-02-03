'use strict'

module.exports = (app) => {
    const passport = require('passport')
    const usersController = require('./../Controller/UsersController')
    const postsController = require('./../Controller/PostsController')
    const config = require('../config');
    app
        .route('/api/auth/signup')
        .post(usersController.signup)


    app
        .route('/api/auth/signin')
        .post(usersController.signin)
    app
        .route('/api/auth/signup')
        .get((req,res)=>{res.sendFile(config.publicpath+'/registration.html')})

    app
        .route('/api/auth/signin')
        .get((req,res)=>{res.sendFile(config.publicpath+'/login.html')})




        

    app
        .route('/api/users')
        .get(passport.authenticate('jwt', { session: true }), usersController.getAllUsers)
        
    app
        .route('/api/posts')
        .get(passport.authenticate('jwt', { session: false }), postsController.getPosts)
    app
        .route('/')
        .get((req,res)=>
        {
            res.sendFile(config.publicpath+'/registration.html')
        })
}