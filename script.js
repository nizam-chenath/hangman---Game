const wordE1 = document.getElementById('word');
const wrongE1 = document.getElementById('wrong-letters');
const playAgain = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts  = document.querySelectorAll(".figure-part");

const words = ['application', 'programming', 'frontend', 'backend', 'json', 'javascript', 'compiler', 'website', 'software', 'computer', 'operating system', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//play again
function refreshPage(){
    window.location.reload();
};
// show hidden words
function displayWord(){
    wordE1.innerHTML = `${selectedWord.split('').map(letter =>`<span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''} </span> `
                        ).join('')}`;

                        const innerWord = wordE1.innerText.replace(/\n/g, '');

                        if(innerWord === selectedWord){
                            finalMessage.innerText = 'Congratulations.! You won...😁';
                            popup.style.display = 'flex';
                        }
}

// update the wrong letters
function updateWrongLetterE1(){
    // display wrong letters
    wrongLettersE1.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

    // display parts
    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });
    
    //check if lost
    if(wrongLettersE1.length === figureParts.length){
        finalMessage.innerText = 'sorry you lost....😭';
        popup.style.display = 'flex';
    }
}

//show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    },2000)
}

//keydown letter press
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetterE1();
            }else{
                showNotification();
            }
        }
    }
});

// restart game and play again
playAgain.addEventListener('click', () =>{
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(math.random() * words.length)];

    displayWord();

    updateWrongLetterE1()

    popup.style.display = 'none';
})
displayWord();