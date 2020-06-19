var Mocha = require('mocha');
fs = require('fs');
path = require('path');

var mocha = new Mocha();
var testDir = 'test';
async function runMocha() {
    let promise = new Promise ((resolve, reject) => {
        // Add .js files in test directory to mocha instance
        fs.readdirSync(testDir).filter(function(file) {
            return file.substr(-3) ==='.js';
        }).forEach(function(file) {
            mocha.addFile(path.join(testDir,file));
        });

        mocha.run(function(failures) {
            process.exitCode = failures ? 1: 0;
        });
        resolve("fin");
    })
    let result = await promise;
    console.log(result);
}

runMocha();
// console.log('debut');
// runMocha().then(result => {
//     console.log(result);
// }).catch( error => {
//     console.log(error);
// });