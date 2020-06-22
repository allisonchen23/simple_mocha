var Mocha = require('mocha');
fs = require('fs');
path = require('path');
const {argv} = require('yargs'); //n_warmup_iters, n_perf_iters
console.log(argv.warmup_iters);
console.log(argv.perf_iters);

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
    // reinstantiate a new Mocha object, run it, then unload files to clear the cache
    mocha = new Mocha();
    runMocha();
    mocha.unloadFiles();
}
