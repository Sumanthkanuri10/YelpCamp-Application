const express=require('express');
const app=express();
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const path=require('path')
const ejsMate=require('ejs-mate')
const ExpressError=require('./utils/ExpressError')
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const methodOverride=require('method-override')
const passport=require('passport')
const helmet=require('helmet')
const LocalStrategy=require('passport-local')
const User=require('./models/user.js')
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(mongoSanitize())
app.use(helmet({contentSecurityPolicy:false}))
const session=require('express-session')
app.engine('ejs',ejsMate)
const flash=require('connect-flash')
const userRoutes=require('./routes/users.js')

const reviewRoutes= require('./routes/reviews.js')
const campgroundRoutes=require('./routes/campgrounds.js')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
    
const sessionConfig={
    secret:'This is me',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+ 1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser=req.user
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next()
})
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use('/',userRoutes)
app.use('/campgrounds',campgroundRoutes)
app.use('/campgrounds/:id/reviews',reviewRoutes)
app.get('/', async (req,res)=>{
    res.render('home')
})
app.use(express.static(path.join(__dirname,'public')))    

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})
app.use((err,req,res,next)=>{
    const {statusCode=500,message='something went wrong'}=err;
    if (!err.message) err.message="something went wrong"
res.status(statusCode).render('error',{err})
})
app.listen(3000,(req,res)=>{
    console.log('port running on 3000')
})