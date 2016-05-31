$(document).ready(function() {

  // BLACK DIAMOND: Fetch all tweets from local storage
  getTweets();

  // Enable tooltips everywhere
  $(document.body).tooltip({ selector: "[title]" });

  // STEP 1: Initially, the Tweet button and the character count button below should be hidden
  $('#tweet-controls').hide();

  // STEP 6: The tweet actions below should only show up when you hover over the tweet. Otherwise, they should be hidden
  // STEP 7: The Retweets/timestamp/Reply areas below should also be hidden by default. These should only expand if you click on the tweet. Use a jQuery animation to accomplish the reveal, similar to how it’s done on Twitter.com
  hideTweetFeatures();

  // STEP 2: When the user clicks on the textarea, the textarea should double in size and the character count and Tweet buttons should be revealed
  $('.tweet-compose').on('click', function() {
    $(this).height($(this).height() * 2);
    $('#tweet-controls').fadeIn('slow');

    var count = getTweetLength();

    if (count === 140) {
      $('#tweet-submit').prop('disabled', true);
    }
  });

  // STEP 3: As the user types the character count should decrease. Once it hits 10 character or less the count should turn red
  $('.tweet-compose').keyup(function() {
		var count = getTweetLength();
		$('#char-count').html(count);

		if (count < 10) {
			$('#char-count').css('color', 'red');
		} else {
			$('#char-count').css('color', 'inherit');
		}

    // STEP 4: If the user puts in more than 140 characters, the tweet button should be disabled (and re-enabled when there are <= 140 chars)
		if (count == 140 || count < 0) {
			$('#tweet-submit').prop('disabled', true);
		} else {
			$('#tweet-submit').prop('disabled', false);
		}
  });

  // STEP 5: When the user successfully inputs characters and clicks the “Tweet” button, a new tweet should be created and added to the tweet stream in the main column, using the user’s fake profile image in the top left and username/fullname
  $('#tweet-submit').on('click', function() {
    var el = $('.tweet:first').clone();
		el.find('.avatar').prop('src', 'img/damenleeturks.jpg');
		el.find('.fullname').html('Philipp Schulte');
		el.find('.username').html('@phillies');
		el.find('.tweet-text').html($('.tweet-compose').val());
    // BLACK DIAMOND: Make the timestamp below similar to how they look on Twitter (1h, 18m, 1m) and use the jQuery timeago plugin to make them automatic
    el.find('.time').html(timestamp());
		$('#stream').prepend(el);

    // Hide all tweet features after creating the tweet
    hideTweetFeatures();

    // BLACK DIAMOND: Persist new tweets using local storage
    setTweets();
  });

  // STEP 6: The tweet actions below should only show up when you hover over the tweet. Otherwise, they should be hidden
  $(document).on('mouseenter', '.tweet', function() {
    $(this).find('.tweet-actions').show();
  }).on('mouseleave', '.tweet', function() {
    $(this).find('.tweet-actions').hide();
  });

  // STEP 7: The Retweets/timestamp/Reply areas below should also be hidden by default. These should only expand if you click on the tweet. Use a jQuery animation to accomplish the reveal, similar to how it’s done on Twitter.com
  $(document).on('click', '.tweet', function() {
		$(this).find('.stats').show({duration: 400});
		$(this).find('.reply').show();
	});

  // BLACK DIAMOND: Implement the Bootstrap tooltips for when you hover over a user’s avatar image
  $(document).on('mouseenter', '.tweet', function() {
    $(this).find('.tweet-actions').tooltip('show');
  }).on('mouseleave', '.tweet', function() {
    $(this).find('.tweet-actions').tooltip('hide');
  });

  // Helper functions
  function getTweetLength () {
    return 140 - $('.tweet-compose').val().length;
  }

  function hideTweetFeatures () {
    $('.tweet-actions').hide();
    $('.stats').hide();
    $('.reply').hide();
  }

  function timestamp () {
    var now = new Date();
    return now.format('h:MM TT - dd mmmm yy');
  }

  function setTweets () {
    var tweets = $('#stream').html();
    localStorage.setItem('tweets', tweets);
  }

  function getTweets () {
    if(localStorage.getItem('tweets')) {
      $('#stream').html(localStorage.getItem('tweets'));
    }
  }
});
