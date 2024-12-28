const mongoose = require('mongoose');
const Campground=require('../models/campground');
const cities=require('./cities')
const {places,descriptors}=require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
    const sample=array=>array[Math.floor(Math.random()*array.length)];
    
const seedDB= async()=>{
    await Campground.deleteMany({});

    for (let i=0; i<50;i++){
        const price=Math.floor(Math.random()*80)+10
        const random1000=Math.floor(Math.random()*1000)
        const camp = new Campground({
            author:'675636c9996d52c0dadb2cc3',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'sumanth',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,cities[random1000].latitude]
            },
            image:[
                {
                    url: 'https://res.cloudinary.com/dgiafqwup/image/upload/v1733804874/YelpCamp/yzw2vfinzexj3xmvasbb.jpg',
                    filename: 'YelpCamp/yzw2vfinzexj3xmvasbb',
      
                  },
                  {
                    url: 'https://res.cloudinary.com/dgiafqwup/image/upload/v1733804874/YelpCamp/r5rtgacxefsxrmm4gozi.jpg',
                    filename: 'YelpCamp/r5rtgacxefsxrmm4gozi',
                   
                  }
            ]
        })
        
        await camp.save();
      
    }}

seedDB().then((()=>{
    mongoose.connection.close()
}));