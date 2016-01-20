var fs = require('fs');
var csv = require('csv');
var parse = require('csv-parse');
var transform = require('stream-transform');

require('should');
var output = [];
var counts = {};
var similarProd = [];
var Orders = [];
var similarOrders= [];
var similarScore = {};

//
// Parsing csv into array 
//

var parser = csv.parse({}, function(err, data){
  output.push(data);
  for (var i = 0; i < data.length; i++) {
    Orders.push({Product: Number(data[i][0]), Customer: data[i][1]});
  };
  
  //
  // Removing csv headers since I created objects for easier naming.
  //

  Orders.shift();

  //
  // Counting to see how many times products were ordered.
  //

  for (var d = 0; d < Orders.length; d++) {
    var prodCount = Orders[d].Product;
    counts[prodCount] = (counts[prodCount] || 0) + 1;
  }


  //
  // Grouping products into if they were bought more than once
  //

  for (var key in counts){
    if(counts.hasOwnProperty(key)){
      if (counts[key] > 1) {
         for (var i = 0, l = Orders.length; i < l; i ++) {
             var v = Orders[i];
             if (key == v.Product) {
               similarProd.push(v);
            }
          }
       }
    }
  }

  //
  // Comparing to see if products were bought by the same customers
  // And adding to new array to compare to.
  //

  for (var i = 0; i < similarProd.length -1;) {
    var firstValue = similarProd[i];
    var secondValue = similarProd[i + 1];
    
    if(firstValue.Product == secondValue.Product) {
      for (var x = 0; x < similarProd.length;) {
        if (firstValue == similarProd[x]) {
          similarOrders.push(similarProd[i]);
          x++;
        }
        else {
          x++;
        }
      }
    };
    i++;
  };

  //
  // If products were more ordered than others and by
  // Same customers then given higher score since they
  // Would show up more than other products
  // Adding to object with score.
  //

  for (var i = 0; i < similarOrders.length -1; i++) {
    var f = 0;
    for(var x = 0; x < similarOrders.length;){
      var firstCustomer = similarOrders[i];
      var secondCustomer = similarOrders[x];
      if(firstCustomer.Customer == secondCustomer.Customer){
        similarScore[firstCustomer.Product] = (similarScore[firstCustomer.Product] || 0) + 1;
        x++;
      }
      else if (firstCustomer.Product == similarOrders[x].Product) {
        similarScore
        x++;
      }
      else {
        x++;
      }
    };
  };
  
  console.log(similarScore);
});

fs.createReadStream('orders.csv').pipe(parser);
