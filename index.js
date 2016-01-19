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
  };
  Orders.shift();
  console.log(Orders[3].Product);
  /*
  Orders.forEach(function(obj) {
      var key = JSON.stringify(obj);
      counts[key] = (counts[key] || 0) + 1;
  });
  */
  for (var d = 0; d < Orders.length; d++) {
      var hey = Orders[d].Product
   counts[hey] = (counts[hey] || 0) + 1;
  }
  console.log(counts);
});

fs.createReadStream('orders.csv').pipe(parser);


console.log(counts);
