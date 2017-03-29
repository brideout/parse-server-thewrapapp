
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.define("updateExpDate", function(request, response){
  var query = new Parse.Query(Parse.User);
    error: function(error){
            response.error('query error: '+ error.code + " : " + error.message);
    }
  });
});
