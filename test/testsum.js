var sum = require('../sum');
var expect = require('chai').expect;

var arr = [2,3]; //n_warmup_iter, n_perf_iter
let sleep = function (time_ms) {
    let promise = new Promise((resolve) => {
        setTimeout(() => {resolve();}, time_ms);
    });
    return promise;
}
// for (var i = 0; i < 2; i++) {
//     describe('#sum()', function () {
//         context('without arguments', function () {
//             it('should return 0', function() {
//                 expect(sum()).to.equal(0);
//             })
//         })
//         context('with number arguments', function() {
//             it('should return sum of arguments', function() {
//                 expect(sum(1,2,3,4,5)).to.equal(15);
//             })
    
//             it('should return argument when only 1 argument is passed', function () {
//                 expect(sum(5)).to.equal(5);
//             })
//         })
//     })
// }

describe('#sum()', function () {
    context('without arguments', function () {
        it('should return 0', async function() {
            await sleep(1000);
            expect(sum()).to.equal(0);
        })
    })
    context('with number arguments', function() {
        it('should return sum of arguments', async function() {
            await sleep(1000);
            expect(sum(1,2,3,4,5)).to.equal(15);
        })

        it('should return argument when only 1 argument is passed', async function () {
            await sleep(1000);
            expect(sum(5)).to.equal(5);
        })
    })
})