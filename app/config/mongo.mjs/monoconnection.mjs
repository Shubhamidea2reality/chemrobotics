// import mongoose from 'mongoose';

// const connectDB = async() => {
//     try{
//       const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
//       console.log(`Conneted to mongodb databse ${conn.connection.host}`);
//     }catch(error){
//     console.log(`Error in mongoDB ${error}`);
//     }
// };


// export default connectDB; 




// const { MongoClient } = require('mongodb');

// // Replace the connection string with your actual MongoDB URI
// const uri = 'mongodb://chemrobo_root:lEbuy4rOw@103.148.156.127:27017/chemrobo_db';

//  async function connectToDB() {
//   try {
//     // Connect to the MongoDB server
//     const client = new MongoClient(uri);
//     await client.connect();
//     console.log('Connected successfully to MongoDB');

//     // Store the client instance in app.locals or a global variable
//     app.locals.db = client.db(); // Assuming you are using Express.js
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }
// export default connectToDB();