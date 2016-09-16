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
  },

  addAdopt: function(){
    $('#puppy-list').on("click", "a", function(event){
      $puppyId = $(this).attr("data-id");
      REQUEST.delete($puppyId);
    });
  }
}

STATUS = {

  $(document).ajaxStart(function(){
    $('#alert').html("Waiting...").addClass('waiting');
  })


}





REQUEST = {
  get: function() {
    return $.get('https://ajax-puppies.herokuapp.com/puppies.json');
  },

  post: function(puppyInfo) {
    var options = {
      url: "https://ajax-puppies.herokuapp.com/puppies.json",
      method: "POST",
      data: JSON.stringify(puppyInfo),
      dataType: "json",
      contentType: 'application/json',
      success: function(){
        $('#refresh-puppies').trigger('click');
      }
    }
    $.ajax(options);
  },

  delete: function(puppyId) {
    var options = {
      url: "https://ajax-puppies.herokuapp.com/puppies/"+ puppyId + ".json",
      type: "DELETE",
      dataType: "json",
      contentType: 'application/json',
      success: function(){
        $('#refresh-puppies').trigger('click');
      }
    }
    $.ajax(options);
  }
}


VIEW = {
  submitPuppyInfo: function() {
    var name = $('#puppy-name').val();
    var breed_id = $('#breed').val();
    return {
      puppy: {
        name: name,
        breed_id: breed_id
      }
    }
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
  LISTENER.addAdopt();
});
