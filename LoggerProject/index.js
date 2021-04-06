const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({ input: process.stdin , output: process.stdout }); //used for getting user input in cli


let name, gender, email = '';
let date = Date();  //gets current timestamp
let jsonData = {}

const jsonReader = (filePath, cb) => (
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if(err) {
            return cb && cb(err)
        }

        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object)
        } catch (err) {
            return cb && cb(err);

        }
    })
);

const jsonWriter = (filePath, content) => (
    fs.writeFile(filePath, content, err => {
        if (err) {
          console.error(err);
          return
        }
        console.error('Success! Data Added');
      })
);



//read json file then ask for input
jsonReader('./data.json', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        jsonData = data;

        // //ask in cli for user input
        rl.question('Enter Name: ', (input) => {
            name = input;

            rl.question('Enter Gender: ', (input) => {
                gender = input;

                rl.question('Enter Email: ', (input) => {
                    email = input;
                    rl.close();
                });
            });

   
        });

    }
});

//when inputs are taken, create object then push onto parsed JSON data
rl.on('close', () => {

    const content = { name: name, gender: gender, email: email, timestamp: date };

    jsonData.push(content);

    //write parsed JSON back into json file
    jsonWriter('./data.json', JSON.stringify(jsonData, null, 2));
});