// particle.js background js
window.onload = function() {
  Particles.init ({
    selector: '.background'
  });
};

// supporting js
const choiceContainer = document.getElementById('choiceContainer');
const quoteContainer = document.getElementById('quoteContainer');
const timeContainer = document.getElementById('timeContainer');
const jokeContainer = document.getElementById('jokeContainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function motivateMe() {
  getQuote();
}

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    choiceContainer.hidden = true;
    timeContainer.hidden = true;
    jokeContainer.hidden = true;
}

// Hide Loading
function showQuote() {
    if (!loader.hidden) {
      quoteContainer.hidden = false;
      timeContainer.hidden = true;
      loader.hidden = true;
      choiceContainer.hidden = true;
      jokeContainer.hidden = true;
    }
}

// Show time
function showTime() {
    if (!loader.hidden) {
        timeContainer.hidden = false;
        quoteContainer.hidden = true;
        loader.hidden = true;
        choiceContainer.hidden = true;
        jokeContainer.hidden = true;
    }
}

// Show joke
function showJoke() {
    if (!loader.hidden) {
        jokeContainer.hidden = false;
        timeContainer.hidden = true;
        quoteContainer.hidden = true;
        loader.hidden = true;
        choiceContainer.hidden = true;

    }
}

// back Loading
function back() {
    // loader.hidden = true;
    // if (!quoteContainer.hidden) {
    //     choiceContainer.hidden = false;
    //     timeContainer.hidden = true;
    //     quoteContainer.hidden = true;
    // }
    choiceContainer.hidden = false;
    timeContainer.hidden = true;
    quoteContainer.hidden = true;
    jokeContainer.hidden = true;
}

// Get Quote From API
async function getQuote() {
    loading();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        showQuote();
    } catch (error) {
        getQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
// getQuote();
// complete();

// date and time
function dateTime() {
    loading();
    try {
        const timeText = document.getElementById('timeText');
        var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        timeText.innerText = dateTime;
        showTime();
    }
    catch(error) {
        dateTime();
    }
}

// joke
function getJoke() {
    loading();
    try {
        getJock();
        const button = document.querySelector(".jokeContainer .jokeButton");
        const jokeDiv = document.querySelector(".jokeContainer .jokeText p");

        document.addEventListener("DOMContentLoaded", getJock);

        button.addEventListener("click", getJock);

        async function getJock() {
        const jokeData = await fetch("https://icanhazdadjoke.com/", {
            headers: {
            Accept: "application/json"
            }
        });
        const jokeObj = await jokeData.json();
        jokeDiv.innerHTML = jokeObj.joke;
        console.log(jokeData);
        }

        showJoke();
    }
    catch(error) {
        getJoke();
    }

  }