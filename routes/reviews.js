const {campgroundSchema,reviewSchema}=require('../schemas.js')
const Campground=require('../models/campground');
const Review=require('../models/review.js')
const express= require('express');
const router=express.Router({mergeParams:true});
const catchAsync=require('../utils/catchAsync')
const app=express();
const reviews = require('../controllers/reviews');
const{isLoggedIn,validateReview}=require('../middleware.js')
const ExpressError=require('../utils/ExpressError')
app.use(express.urlencoded({extended:true}))

router.post('/', validateReview, isLoggedIn,catchAsync(reviews.createReview))
router.delete('/:reviewId',isLoggedIn,catchAsync(reviews.deleteReview))
module.exports=router;