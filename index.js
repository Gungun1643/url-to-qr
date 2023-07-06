/* 
1. Use the inquirer npm package to get user input. 
2. Use the qr-image npm package to turn the user entered
 URL into a QR code image.
3. Create a txt file to save the user input using the 
native fs node module.
*/
import inquirer from 'inquirer';
// import the qr code 
// import QRCode from 'qrcode';
// import fs 
import fs, { writeFile } from 'fs';
import qr from 'qr-image';


// here is the basic structure of setting up the inquirer
/*
1. prompt => this function needs an Array of questions 
and it returns a promise since it is an asynchrounous 
function
2. questions => it is an array containing all of the question objects
3. answer => it is an object containing all of the answers for every prompt/question 
 */

// so here is the basic structure of the questions array 
/*
1.type = it is the type of prompt or question to be displayed on the console 
2.name = since the answer is an object, it is the key for every question that is going to be stored in the answer object 
3.message = it is the message to be displayed on the screen 
*/
/*this is type if you want to accept the texts as data 
=> so that's why the value of the answer in this type of prompt is a string  */
// const a = "";
/****************************************************** */
inquirer
    .prompt([{
        type: 'input',
        name: 'givenUrl',
        /*this is the actual message to be printed */
        message: 'Enter your url  : '
    },
    ]).then((answers) => {
        // a = answers.givenName;
        const givenURL = answers.givenUrl;

        console.info("Answers : ", answers.givenUrl);

        /*here is the code to generate the QR code  */

        var qr_svg = qr.image(givenURL);

        // qr_svg.pipe(require('fs').createWriteStream("qr_img.png"));
        /*or you could also write it directly  */
        qr_svg.pipe(fs.createWriteStream("qr_img.png"));

      /*  3. Create a txt file to save the user input using the 
        native fs node module.*/
        fs.writeFile("URL.txt", givenURL, (err) =>{
            if (err) throw err;
            console.log("The file has been saved!!");
        });

    }).catch((err) => {
        console.error(err);
    });
