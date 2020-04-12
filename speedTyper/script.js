const randomQuoteAPI = "https://api.quotable.io/random";
const quoteElement = document.getElementById('quote');
const textInputElement = document.getElementById('textInput');
const timerElement = document.getElementById('timer');
const containerElement = document.getElementById('container');
const timerTitleElement = document.getElementById('timerTitle');
const headerElement = document.getElementById('header');

textInputElement.addEventListener('input', () => {
    const arrayQuote = quoteElement.querySelectorAll('span');
    const arrayInput = textInputElement.value.split('');
    let pass = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayInput[index];
        if (character == null ) {
            characterSpan.classList.remove('identical');
            characterSpan.classList.remove('not-identical');
            pass = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('identical');
            characterSpan.classList.remove('not-identical');
        } else {
            characterSpan.classList.remove('identical');
            characterSpan.classList.add('not-identical');
            pass = false;
        };  
    });
    if (pass) {
        execute();
    }
});

let time = 0;
let myInterval = -1;

containerElement.addEventListener('click', () => {
    if (myInterval == -1) {
        myInterval = setInterval(() => {
            time++;
            timerElement.innerText = time;
        }, 1000);
    } else {
        clearInterval(myInterval);
        myInterval = -1;
    };

    containerElement.style.backgroundColor = '#45A29E';
    quoteElement.style.color = '#C5C6C7';
    textInputElement.style.caretColor = '#C5C6C7';
    textInputElement.style.color = '#C5C6C7';
    headerElement.style.color = '#45A29E';
    timerElement.style.color = '#45A29E';
    timerTitleElement.style.color = '#45A29E';
});

getRandomQuote = () => {
    return fetch(randomQuoteAPI)
        .then(response => response.json())
        .then(data => data.content)
}

async function execute() {
    const randomQuote = await getRandomQuote();
    quoteElement.innerHTML = '';
    randomQuote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteElement.appendChild(characterSpan);
    })
    textInputElement.value = null;
    time = 0;
}

execute();