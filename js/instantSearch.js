/*	instantSearch.js
 *	Created: May 25, 2015 by Sahil Saini
 *	Purpose: This script implements Sahil's version of YouTube Instant Search 
 */

var playlist = [];				// Array to hold most recent video search results
var player;								// Object to hold embedded YT player 
var playerReady = false;	// Boolean to hold status of player
var instantSearchOn = true;			// Boolean describing whether instant search feature is on

// Function to search for query and store video results
// Input: search term (string)
// Output: true if search successful, false o/w
function search(query) {
	var request = gapi.client.youtube.search.list({q: query, part: 'snippet', type: 'video'});
	
	request.execute(function(response) {
		if (response.result["pageInfo"]["totalResults"] == 0) {
			console.log('No videos found');
			return false;
		} else {
			console.log('Search successful');
			playlist = parseResponse(JSON.stringify(response.result));
			updatePlaylist();
			$('#searchBox').focus();	// keep focus on searchBox
			return true;
		}	
	});
}

// Function to parse response from Data API
// Input: response string
// Output: array of JSON objects
function parseResponse(responseString) {
	var resp = JSON.parse(responseString);
	var videoResults = resp['items'];
	var parsedVideoResults = [];
	for (var i = 0; i < 5; i++) {
		var videoInfo = videoResults[i];
		var videoObj = {}
		videoObj['videoId'] = videoInfo.id.videoId;
		videoObj['title'] = videoInfo.snippet.title;
		videoObj['thumbnail'] = videoInfo.snippet.thumbnails.default.url;
		parsedVideoResults.push(videoObj);
	}
	return parsedVideoResults;
}

// Function to update playlist in both back-end and front-end 
function updatePlaylist() {
	// Initialize playlist when page first loads
	if (typeof player === "undefined") {
		player = new YT.Player('player', {
			height: '390',
			width: '640',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	} else {
		// Update playlist in player
		var videoIdArr = [];
		for (var i = 0; i < 5; i++) {
			videoIdArr.push(playlist[i]['videoId']);
		}
		player.loadPlaylist(videoIdArr);

		// Update display
		for (var i = 0; i < 5; i++) {
			videoInfo = playlist[i];
			switch(i) {
				case 0:
					$('#playingVideoTitle').text(videoInfo.title);
					break;
				case 1:
					$('#video1').find('img').attr('src', videoInfo.thumbnail);
					$('#video1').find('span').text(videoInfo.title);
					break;
				case 2:
					$('#video2').find('img').attr('src', videoInfo.thumbnail);
					$('#video2').find('span').text(videoInfo.title);
					break;
				case 3:
					$('#video3').find('img').attr('src', videoInfo.thumbnail);
					$('#video3').find('span').text(videoInfo.title);
					break;
				case 4:
					$('#video4').find('img').attr('src', videoInfo.thumbnail);
					$('#video4').find('span').text(videoInfo.title);
					break;
			}
		}
	}
}

// Called when Javascript client library loads
function OnLoadCallback() {
		gapi.client.setApiKey('AIzaSyBKkh8aziRi0Enj475QDEz5DPKD_JCftE0');
		gapi.client.load('youtube', 'v3').then(function() { 
			console.log('Data API loaded'); 

			// Don't embed player until player API code downloads
			if (playerReady) {			
				search('uw computing history');
			}
		});
}


//********************** Player API callback functions ********************************

// Function called after Player API code downloads 
function onYouTubeIframeAPIReady() {
	playerReady = true;	
}

// Function called when video player is ready
function onPlayerReady(event) {
	var videoIdArr = [];

		// Initialize display of search results
		for (var i = 0; i < 5; i++) {
			videoInfo = playlist[i];
			switch(i) {
				case 0:
					$('#playingVideoTitle').text(videoInfo.title);
					break;
				case 1:
					$('#video1').find('img').attr('src', videoInfo.thumbnail);
					$('#video1').find('span').text(videoInfo.title);
					break;
				case 2:
					$('#video2').find('img').attr('src', videoInfo.thumbnail);
					$('#video2').find('span').text(videoInfo.title);
					break;
				case 3:
					$('#video3').find('img').attr('src', videoInfo.thumbnail);
					$('#video3').find('span').text(videoInfo.title);
					break;
				case 4:
					$('#video4').find('img').attr('src', videoInfo.thumbnail);
					$('#video4').find('span').text(videoInfo.title);
					break;
			}
			videoIdArr.push(videoInfo.videoId);
		}

	player.loadPlaylist(videoIdArr);
	
}

// Function called when player state changes
function onPlayerStateChange(event) {
	if (event.data === 1) {
		var playingIndex = player.getPlaylistIndex();

		// Remove highlighting from previously selected video and highlight one now playing
		$('.videoResult').find('span').css('background-color', '#ff564b');
		if (playingIndex > 0) {
			$("#video" + playingIndex).find('span').css('background-color', '#1c202b');
		}

		// Update title of video in main player
		$('#playingVideoTitle').text(playlist[playingIndex].title);
	}
}


//********************************* Event Handlers ******************************
$(document).ready(function() {
	// Handle pressing ENTER in searchBox 
	$('#searchBox').keypress(function(e) {
		if(e.which == 13 && !instantSearchOn) {
			search($(this).val());
		}
	});

	// Handle live monitoring of searchBox 
	$('#searchBox').on('input', function(e) {
		if (instantSearchOn) {
			search($(this).val());
		}
	});

	// Handle clicks on other videos in playlist
	$('.videoResult').on('click', 'img, span', function() {
		$this = $(this);
	
		// Remove highlighting from previously selected video if applicable
		$('.videoResult').find('span').css('background-color', '#ff564b');	

		// Highlight clicked video
		$this.closest('.videoResult').find('span').css('background-color', '#1c202b');

		// Play selected video in main player
		var id = $this.closest('.videoResult').attr('id');
		var playlistIndex = parseInt(id.substr(id.length - 1));	
		player.playVideoAt(playlistIndex);

		// Update title of video in main player
		$('#playingVideoTitle').text(playlist[playlistIndex].title);
	});

	// Handle toggling of Instant Search
	$('.searchTypeStatus').on('click', function() {
		if (instantSearchOn) {
			instantSearchOn = false;
			$(this).text('OFF');
			$('#searchTitle').text('Search YouTube Regularly');
		} else {
			instantSearchOn = true;
			$(this).text('ON');
			$('#searchTitle').text('Search YouTube Instantly!');
		}
	});

	// Handle resizing of window to fix display issue with playlistContainer
	$(window).resize(function() {
		if ($(this).width() < 948) {
			$('#playlistContainer').css('display', 'none');
		} else {
			$('#playlistContainer').css('display', 'block');
		}
	});

});
