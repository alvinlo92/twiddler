// Utility functions


let tweetBoxMaker = () => {
  let count = 0;
  return function() {
    var $tweet = $('<div class="tweets" id="tweet' + count + '"></div>');
    $(".container").prepend($tweet);
    let output = "#tweet" + count;
    count++;
    return output;
  }
}

let makeTweetBox = tweetBoxMaker();

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
      var tweetId = makeTweetBox();

      var $twitterHandle = $('<div class="twitterHandle"></div>');
      var $message = $('<div class="message"></div>');


      // $tweet.html('@' + tweet.user + '<br>' + tweet.message + '<br>' + tweet.created_at);
      // $tweet.html(tweet.message);
      $twitterHandle.html(tweet.user);
      $message.html(tweet.message);

      $(tweetId).prepend($twitterHandle);
      $(tweetId).append($message);
      //tweetId).prepend(message);
      //tweetId).prepend(time);

      console.log(tweetId + "'@' " + tweet.user + " " + tweet.message + " " + tweet.created_at);

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