var Mocha = require('mocha');
const { INSPECT_MAX_BYTES } = require('buffer');
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
let itr = 0;
async function callback(failures) {
    // itr++;
    i++;
    running = false;
    console.log("Iteration number " + (itr+1) + "\nNumber of failures: " + failures);
    return Promise.resolve(itr++);
}
console.log(argv.w); //can also use argv.n_warmup_iter
var mocha = new Mocha();
var testDir = 'test';

let sleep = function (time_ms) {
    let promise = new Promise((resolve) => {
        setTimeout(() => {resolve();}, time_ms);
    });
    return promise;
}
async function runMocha(wi) {
    console.log("in runMocha()");
    fs.readdirSync(testDir).filter(function(file) {
        return file.substr(-3) ==='.js';
    }).forEach(function(file) {
        mocha.addFile(path.join(testDir,file));
    });

    // mocha.run(function(failures) {
    //     process.exitCode = failures ? 1: 0;
    // });
    // mocha.run(async function(failures) {
    //     itr++;
    //     let promise = new Promise((resolve, failures) => {
    //     resolve("Iteration number " + itr + "\nNumber of failures: " + failures);
    // });

    mocha.run(async function(failures) { 
        console.log(await callback(failures));
    });
    // return promise;
    mocha.unloadFiles();
    return "fin";
}
let running = false;
let i=0;

async function main() {
    // var i=0;
    while (i < 2) {
        if ( !running ) {
            if (i === itr) {
                running = true;
                mocha = new Mocha();
                console.log("pre mocha run");
                await runMocha();
            }
            else {
                i++;
            }
        }
        else {
            await sleep(1000);
            console.log("i: " + i + "\nitr: " + itr);
        }
        // mocha = new Mocha();
        // console.log("pre mocha run");
        // await runMocha();
        // // while (itr != i) {
        // //     sleep(500);
        // // }
        // await sleep(5000);
        // console.log("post");
        // i++;
    }
    // for (i=0; i<2; i++)
    // {
    //     // reinstantiate a new Mocha object, run it, then unload files to clear the cache
        
    //     mocha = new Mocha();
    //     console.log("pre mocha run");
    //     await runMocha();
    //     // while (itr != i) {
    //     //     sleep(500);
    //     // }
    //     await sleep(5000);
    //     console.log("post");
    // }
}

main();