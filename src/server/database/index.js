import mongoose from "mongoose";

mongoose.Promise = global.Promise;

// here mongo refers to the docker container inside docker-compose.yml
mongoose.connect('mongodb://mongo:27017/app')
.then(res => {
    console.log("Successfully connected to DataBase");
}).catch(e => {
    console.log(e);
    console.log("Unable to connect to DataBase");
})

export default {
    mongoose
};
  