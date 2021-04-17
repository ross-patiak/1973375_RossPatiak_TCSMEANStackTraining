const fs = require("fs");
let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";  //default host and port values for mongodb

let callData;

//Used Sync version out of preferrence; parses all call data into variable
try {
    const data = fs.readFileSync("./call_data.json", "utf8");
    callData = JSON.parse(data);
} catch (err) {
    console.error(err);
}

//connect to database
mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {
    if (!err1) {
        let db = client.db("ilpdb");

        //insert all values at once using insertMany
        db.collection("calldb").insertMany(callData,
            (err2, result) => {
                if (!err2) {
                    console.log(result.insertedCount);
                } else {
                    console.log(err2.message);
                }

                //close connection
                client.close();
            }
        );

    }
});


