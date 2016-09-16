// hit API
// seperate function to convert JSON into HTML elements
// need listener for the refresh
// document ready that has the initial functions
// 

var addRefreshListener = function() {
  $('#refresh-puppies').click(function(){
    var puppyObject = sendGetRequest();
    puppyObject.then(
      function(){
        var updatedPuppies = puppyObject.responseJSON;
        updatePuppyList(updatedPuppies);
      }
    );
  });
};

var sendGetRequest = function(){
  return $.get('https://ajax-puppies.herokuapp.com/puppies.json');
};

var updatePuppyList = function(puppyList) {
  $list = $("#puppy-list")
  $.each(puppyList, function(index, puppy) {
    var created_at = new Date(puppy.created_at);
    var minutesAgo = $.now() - created_at;
    var newPuppy = $('<li>')
                  .html(puppy.name + "(" + puppy.breed + "), created " + minutesAgo + "minutes ago -- ");
  });
}



$('document').ready(function(){
  addRefreshListener();
});