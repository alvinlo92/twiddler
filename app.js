// Utility functions

let userClicked = false;

// Generates tweet div class into container div with unique ID
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

// Makes the tweet box
let makeTweetBox = tweetBoxMaker();


// Clears out and refreshes view with all tweets
// from all users or user indicated
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
    // Generates div class twitterHandle, message, timeStamp into tweedId
    while(currentLocation <= homeLength){
      var tweet = directory[currentLocation];
      var tweetId = makeTweetBox();
      var $twitterHandle = $('<div class="twitterHandle"></div>');
      var $message = $('<div class="message"></div>');
      var $timeStamp = $('<div class="time-stamp"></div>')
      $twitterHandle.html('@' + tweet.user);
      $message.html(tweet.message);
      $timeStamp.html(tweet.created_at);

      // Populates the tweet box
      $(tweetId).prepend($twitterHandle);
      $(tweetId).append($message);
      $(tweetId).append($timeStamp);

      currentLocation += 1;
    }
  }
}

// Refreshes page with all tweets
let refreshTweets = newTweets();

// Refreshes with all tweets from individual user
let showUserTweets = newTweets();

let obtainUserTweets = () => {
    // originally used to store userClicked scope
  return function(thisUser) {
    if (!userClicked) {
      $('.container').empty();
      userClicked = true;
    }
    showUserTweets(thisUser);
  }
}

// Acts as a checker to see if we've clicked present tweeter
let filterUserTweets = obtainUserTweets();

// Things happening in the website:
$(document).ready(function(){
  var $body = $('container');
  $body.html('');

  // Populate tweets
  refreshTweets();

  // Click for more tweets button
  $('#refreshTweets').on('click', function() {
    if (userClicked === true) {
      $(".container").empty();
    }
    $(refreshTweets());
    userClicked = false;
  });

  // Click user handle to view tweets from that user
  $('.container').on('click', 'div.twitterHandle', function(event) {
    let thisUser = event.currentTarget.innerText;
    thisUser = thisUser.split('');
    thisUser.shift();
    thisUser = thisUser.join('');
    filterUserTweets(thisUser);
  });
});
