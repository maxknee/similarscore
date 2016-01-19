var fs = require('fs');
var csv = require('csv');
var parse = require('csv-parse');
var transform = require('stream-transform');

require('should');
var output = [];
var counts = {};

function Order(product, customer) {
  this.Product = product;
  this.Customer = customer;
}

var Orders = [];

var parser = csv.parse({}, function(err, data){
  output.push(data);
  for (var i = 0; i < data.length; i++) {
    Orders.push(new Order(data[i][0], data[i][1]));
    console.log(Orders[i]);
  };
  Orders.shift();
  console.log(Orders);
  Orders.forEach(function(x) {
    counts[x] = (counts[x] || 0) + 1;
  });
});

fs.createReadStream('orders.csv').pipe(parser);


console.log(counts);