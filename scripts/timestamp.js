const replace = require('replace-in-file');
const moment = require('moment-timezone');

//var timeStamp = moment(new Date()).tz('Australia/Sydney').format("DD MMM YYYY hh:mm:ss A z");
var timeStamp = moment(new Date()).tz('Australia/Sydney').format("YYYYMMDDhhmmss");
const options = {
    files: [
        'build/index.html'
    ],
    from: /(.js")/g,
    to: ".js?" + timeStamp + "\"",
    allowEmptyPaths: false,
};




replace(options)
.then(changedFiles => {
    console.log(`js hashed name has been changed`);
    // changedFiles.forEach(x => {
    //     console.log(x.file);
    // }
    //);
});
