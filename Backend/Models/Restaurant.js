
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dishDetails = new Schema({
    Name: {type: String, required: true},
    Price: {type: String, required: true},
    Ingredients: {type: String, required: true},
    Image: {type: String},
    Category: {type: String}
},
{
    versionKey: false
});
var restaurantProfile = new Schema({
    Name: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
    Location: {type: String},
    Description: {type: String},
    Contact: {type: String},
    Timings: {type: String},
    deliveryMode: {type: String},
    PictureOfRestaurants:{type:String},
    dishes:[dishDetails]
},
{
    versionKey: false
});

const restaurants = mongoose.model('restaurants', restaurantProfile);
module.exports = restaurants;
