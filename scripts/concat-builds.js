const concat = require('concat');
const fs = require('fs');

const files = [
    //'dist/polyfills-es5.js',
    'dist/polyfills-es2015.js',
    //'dist/runtime-es5.js',
    'dist/runtime-es2015.js',
    'dist/scripts.js',
    //'dist/main-es5.js',
    'dist/main-es2015.js',
];
concat(files,'dist/bundle.js')
    .then(function () {
         files.forEach(x => {
             fs.unlinkSync(x);
         });
    }).then(function () {
        console.log('concat files done!');
    });
    





    
