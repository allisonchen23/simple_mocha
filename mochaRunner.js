var Mocha = require('mocha');
fs = require('fs');
path = require('path');

//simple yargs
// const {argv} = require('yargs'); //n_warmup_iters, n_perf_iters
// console.log(argv.warmup_iters);
// console.log(argv.perf_iters);

var argv = require('yargs')
    .option('n_warmup_iter', {
        alias: 'w',
        describe: 'Number of warm up iterations'
    })
    .argv

console.log(argv.w); //can also use argv.n_warmup_iter
var mocha = new Mocha();
var testDir = 'test';

async function runMocha(wi) {
    console.log("Number of warm up iterations: " + wi);
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

async function main() {
    var i;
    for (i=0; i<2; i++)
    {
        // reinstantiate a new Mocha object, run it, then unload files to clear the cache
        mocha = new Mocha();
        await runMocha();
        await mocha.unloadFiles();
    }
}

main();