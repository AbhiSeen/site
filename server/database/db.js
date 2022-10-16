import mongoose from 'mongoose';
import Redis from 'ioredis'

const Connection = async (username, password) => {
    const URL = `mongodb+srv://abhi:QMovVAA2N2q3QdOE@cluster0.whvld.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true});
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
    // redis-13849.c301.ap-south-1-1.ec2.cloud.redislabs.com:13849
};


const client=new Redis("redis://:wRF1xAMQB4gfc5xT7P0ti9pmW6yZw2H4@redis-13849.c301.ap-south-1-1.ec2.cloud.redislabs.com:13849");
client.on("connect", () => {console.log("connection successful")});
client.on("error", (e) => {console.error(e)})



export {Connection,client} 