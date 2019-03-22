// var url = 'http://api.icndb.com/jokes/random';
// var button = document.getElementById('get-joke');
// button.addEventListener('click', function(){
//   getJoke();
// });
// var paragraph = document.getElementById('joke');

// function getJoke() {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', url);
//   xhr.addEventListener('load', function(){
//     var response = JSON.parse(xhr.response);
//         paragraph.innerHTML = response.value.joke;
//   });
//   xhr.send();
// }

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
var prefix = "https://cors-anywhere.herokuapp.com/";

if (tweetText.length > 140) {
    getQuote();
} else {
    var tweet = tweetLink + encodeURIComponent(tweetText);
    document.querySelector('.quote').innerText = quoteText;
    document.querySelector('.author').innerText = "Author: " + quoteAuthor;
    document.querySelector('.tweet').setAttribute('href', tweet);
}

function getQuote() {
	fetch(prefix + quoteUrl, { cache: "no-store" })
	fetch(quoteUrl, { cache: "no-store"})
		.then(function(resp) {
			return resp.json();
		})

		.then(createTweet);
}

function createTweet(input) {
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});

