// Utility functions

let userClicked = false;

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

let newTweets = () => {
  let storedIndex;
  let storedHandle;
  return function(userHandle) {
    let currentLocation;
    if (storedIndex === undefined || storedHandle !== userHandle || userClicked) {
      currentLocation = 0;
      storedHandle = userHandle;
    } else {
      currentLocation = storedIndex;
    }

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

// Things happening in the website:

$(document).ready(function(){
  var $body = $('container');
  $body.html('');

  refreshTweets();

  $('#refreshTweets').on('click', function() {
    if (userClicked === true) {
      $(".container").empty();
    }
    $(refreshTweets());
    userClicked = false;
  });


  let obtainUserTweets = () => {

    return function(thisUser) {
      if (!userClicked) {
        $('.container').empty();
        userClicked = true;
      }
      showUserTweets(thisUser);
      console.log(event);
    }
  }

  let filterUserTweets = obtainUserTweets();

  $('.container').on('click', 'a', function(event) {
    let thisUser = this.text
    thisUser = thisUser.split('');
    thisUser.shift();
    thisUser = thisUser.join('');
    filterUserTweets(thisUser);
  });
});
