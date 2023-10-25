const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

main().catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://localhost:27017/campy')
    console.log("Database connected")
}

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6524584b27e8db836538acf6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvkakrwbz/image/upload/v1697749488/Campy/lqzfkivdcced5mre5gtv.jpg',
                    filename: 'Campy/lqzfkivdcced5mre5gtv',
                },
                {
                    url: 'https://res.cloudinary.com/dvkakrwbz/image/upload/v1697749488/Campy/bedl80memxiaqwqioili.jpg',
                    filename: 'Campy/bedl80memxiaqwqioili',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})