var Mocha = require('mocha');
fs = require('fs');
path = require('path');

var mocha = new Mocha();
var testDir = 'test';
async function runMocha() {
    fs.readdirSync(testDir).filter(function(file) {
        return file.substr(-3) ==='.js';
    }).forEach(function(file) {
        mocha.addFile(path.join(testDir,file));
    });

    mocha.run(function(failures) {
        process.exitCode = failures ? 1: 0;
    });
    return "fin";
}

var i;
for (i=0; i<3; i++)
{
    mocha = new Mocha();
    runMocha();
    mocha.unloadFiles();
}

// console.log('debut');
// runMocha().then(result => {
//     console.log(result);
// }).catch( error => {
//     console.log(error);
// });