const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util")

// const PORT = config.app.port;  //Buoi 1
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

async function starServer(){
    try{
        await MongoDB.connect(config.db.uri);
        console.log("connect to the database");
        const PORT = config.app.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(error){
        console.log("cannot connect to the database", error);
        process.exit;
    }
}

starServer();