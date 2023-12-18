const quotes = document.querySelector("#quotes");

fetch("https://api.adviceslip.com/advice")
.then(Response => Response.json())
.then(data => {
    const word = data.slip.advice;
    quotes.innerText= word;
})