var fs = require('fs');
var csv = require('csv-parser');


fs.createReadStream('orders.csv')
    .pipe(csv())
    .on('data', function(data) {
        console.log('row', data);    
    });
