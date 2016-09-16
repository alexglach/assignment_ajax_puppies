// hit API
// seperate function to convert JSON into HTML elements
// need listener for the refresh
// document ready that has the initial functions
//

LISTENER = {
  addRefresh: function() {
    $('#refresh-puppies').click(function() {
      var puppyObject = REQUEST.get();
      puppyObject.then(
        function() {
          var updatedPuppies = puppyObject.responseJSON;
          VIEW.updatePuppyList(updatedPuppies);
        }
      );
    });
  },

  addPost: function() {
    $("#submit-puppy").click(function() {
      var puppyInfo = VIEW.submitPuppyInfo();
      REQUEST.post(puppyInfo);
    });
  }
}





REQUEST = {
  get: function() {
    return $.get('https://ajax-puppies.herokuapp.com/puppies.json');
  },

  post: function(puppyInfo) {
    $.post("https://ajax-puppies.herokuapp.com/puppies.json", puppyInfo, null, "json")
  }
}


VIEW = {
  submitPuppyInfo: function() {
    return $('form').serialize();
  },

  updatePuppyList: function(puppyList) {
    $list = $("#puppy-list")
    $.each(puppyList, function(index, puppy) {
      var created_at = new Date(puppy.created_at);
      var minutesAgo = Math.floor(($.now() - created_at) / 60000);
      $adoptLink = $("<a>")
        .attr("data-id", puppy.id)
        .attr("href", "#")
        .html("Adopt!")
      var $newPuppy = $('<li>')
        .html(puppy.name + "(" + puppy.breed.name + "), created " + minutesAgo + " minutes ago -- ")
        .append($adoptLink);
      $newPuppy.prependTo($list);
    });
  }
}


$('document').ready(function() {
  LISTENER.addRefresh();
  LISTENER.addPost();
});
