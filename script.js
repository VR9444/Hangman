const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-messsage');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

var tmp2 = [];
var tmp = selectedWord.split('').sort();
tmp.forEach((el)=>{
    if(!tmp2.includes(el)){
        tmp2.push(el);
    }
})
const correctLetters = tmp2;

var inputedLetters = [];
var wrongLatters = [];
var flag = false;


function displayWord() {
    var slova =selectedWord.split('');
    wordEl.innerHTML= null;
    slova.forEach((Element) =>{

        if(inputedLetters.includes(Element)){
            wordEl.innerHTML+= "<span class='letter'>"+Element+"</span>";
        }else{
            wordEl.innerHTML+= "<span class='letter'>&nbsp</span>";

        }
        
    })
}
function reset(){
    location.href = "./index.html";
}

function proveraPobede(){
    var i = 0;
    inputedLetters.forEach((el)=>{
        if(correctLetters.includes(el)){
            i++;
        }
        
    })
    if(i==correctLetters.length){
        return true
    }else{
        return false;
    }
    
}
document.addEventListener('keypress',(e)=>{
    flag = 0;
    if (!/^[a-zA-Z]*$/g.test(e.key)) {
        alert("Invalid characters");
    }
    else if(inputedLetters.includes(e.key)){
        notification.classList = "notification-container show";
        setTimeout(() => {notification.classList = "notification-container";}, 1500);
    }
    else{
        inputedLetters.push(e.key);
    }

    inputedLetters.sort();
    
    var wrongLatters = inputedLetters.filter(element => !correctLetters.includes(element));

    wrongLettersEl.innerHTML = '';

    wrongLatters.forEach(element => {
        wrongLettersEl.innerHTML+="<span>"+element+", </span>";
    });
     if(proveraPobede()){
        finalMessage.innerHTML='POBEDIO SI';
        popup.style.display="flex";
     }

    for(let i = 0; i<wrongLatters.length;i++){
        figureParts[i].style.display="inline";
    }
    if(wrongLatters.length>=6){
        finalMessage.innerHTML='IZGUBIO SI';
        popup.style.display="flex";
    }
    displayWord();
    
})


displayWord();
