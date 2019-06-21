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
  return function(userHandle) {
    let currentLocation;
    if (storedIndex === undefined) {
      currentLocation = 0;
    } else {
      currentLocation = storedIndex;
    }

    //have a directory variable (which is something like streams.home or streams.user.tweets)
    //homeLength needs to be set here as well
    let directory;
    if (userHandle === undefined) {
      directory = streams.home;
    } else {
      directory = streams.users[userHandle];
    }

    let homeLength = directory.length - 1;
    storedIndex = homeLength;
    console.log("Index: " + homeLength + " StoredIndex: " + storedIndex);
    while(currentLocation <= homeLength){
      var tweet = directory[currentLocation];
      var tweetId = makeTweetBox();
      var $twitterHandle = $('<div class="twitterHandle"></div>');
      var $message = $('<div class="message"></div>');
      var $timeStamp = $('<div class="time-stamp"></div>')
      var $twitterHandleLink = $('<a></a>');
      $twitterHandleLink.html('@' + tweet.user);
      $message.html(tweet.message);
      $timeStamp.html(tweet.created_at);
      $(tweetId).prepend($twitterHandle);
      $($twitterHandle).append($twitterHandleLink);
      $(tweetId).append($message);
      $(tweetId).append($timeStamp);

      console.log(tweetId + "'@' " + tweet.user + " " + tweet.message + " " + tweet.created_at);

      currentLocation += 1;
    }
  }
}

let refreshTweets = newTweets();

let showUserTweets = newTweets();

refreshTweets();

$('#refreshTweets').on('click', function() {
  $(refreshTweets()).slideDown("slow", function() {});
});

$('.container').on('click', 'a', function(event) {
  $('.container').empty();
  showUserTweets('shawndrost');
  console.log(event);
});
// we want an on click action for twitterHandle
  // open a new page?

});
