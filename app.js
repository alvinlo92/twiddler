// Utility functions

$(document).ready(function(){
  var $body = $('container');
  $body.html('');

let newTweets = () => {
  let storedIndex;
  return function() {
    let currentLocation;
    if (storedIndex === undefined) {
      currentLocation = 0;
    } else {
      currentLocation = storedIndex;
    }
    var homeLength = streams.home.length - 1;
    storedIndex = homeLength;
    console.log("Index: " + homeLength + " StoredIndex: " + storedIndex);
    while(currentLocation <= homeLength){
      var tweet = streams.home[currentLocation];
      var $tweet = $('<div class="tweets"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + tweet.created_at);
      $(".container").prepend($tweet);
      currentLocation += 1;
    }
  }
}

let refreshTweets = newTweets();

refreshTweets();

$('#refreshTweets').click(function() {
  refreshTweets();
});

});