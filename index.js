var fs = require('fs');
var csv = require('csv');
var parse = require('csv-parse');
var transform = require('stream-transform');

require('should');
var output = [];

function Order(product, customer) {
  this.Product = product;
  this.Customer = customer;
}

var Orders = [];

var parser = csv.parse({}, function(err, data){
  output.push(data);
  transformer.write(data);
  for (var i = 0; i < data.length; i++) {
    Orders.push(data[i]);
    console.log(Orders[i]);
  };
});

var transformer = csv.transform(function(data){
  return data.map;
});

transformer.on('readable', function() {
  while(row = transformer.read()) {
    output.push(row);
  }
  console.log('this output');
  console.log(output);
});
fs.createReadStream('orders.csv').pipe(transformer).pipe(parser);
