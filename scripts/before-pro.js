const fs = require('fs');

fs.copyFile('src/environments/environment.ts','src/environments/environment.temp.ts',(err) => {
    if (!err) {
        fs.copyFile('src/environments/environment.prod.ts','src/environments/environment.ts',(err) => {
            if (!err) {
                console.log('prepared');
            }
        })
    }
});



