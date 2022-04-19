const startQuizBtn = document.querySelector('.initial-phase__btn');
const initialPhase = document.querySelector('.initial-phase');
const game = document.querySelector('.game');
let currentAnswers = new Array(5);
const checkBtn = document.querySelector('.check-answers__btn');
const scoreBanner = document.querySelector('.score-banner');
let over = false;
let score = 0;
let quizzes;

function startGame() {
        initialPhase.style.display = 'none';
        game.style.display = 'block';
        document.querySelector('body').style.display = 'block';
        fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple')
           .then(res => res.json())
           .then(data => getQuestions(data.results));
}

function getQuestions(x) {
    quizzes = x;
    for(let i = 0; i < 5; i++) {
        let j = 0;
        let q = document.getElementById(`q${i}`);
        q.innerHTML = x[i].question;
        let answers = document.querySelectorAll(`.a${i}`);
        let correctAnswer = answers[Math.floor(Math.random() * 4)]
        correctAnswer.innerHTML = x[i].correct_answer;
        answers.forEach(answer => {
            answer.classList.add(i)
            if(answer.innerHTML == '') {
                answer.innerHTML = x[i].incorrect_answers[j];
                j++;
            }
            answer.addEventListener('click', () => {
                    selectAnswer(answer.classList[2], answer.innerText);
                document.querySelectorAll(`.a${answer.classList[2]}`).forEach(ans => {
                    ans.classList.remove('selected')
                })
                answer.classList.add('selected')
            })
        })
    }
}

function selectAnswer(order, id) {
    currentAnswers[order] = id;
    console.log(currentAnswers)
}

function checkAnswers(x) {
    if(!over) {
        for(let i = 0; i < 5; i++) {
        document.querySelectorAll(`.a${i}`).forEach(ans => {
            if(x[i].correct_answer == ans.innerText) {
                ans.style.backgroundColor = 'Green';
                ans.style.color = '#fff';
            } else {
                if(ans.innerHTML == currentAnswers[i]) {
                    ans.style.backgroundColor = 'red';
                }
            }
        })
        if(x[i].correct_answer == currentAnswers[i]) {
            score++;
        }
        over = true;
        scoreBanner.innerText = `You got ${score}/5 right answers! ${score == 0 ? '😔' : score < 3 ? '😬' : '🥳'}`;
        checkBtn.innerText = 'Another Quiz?'
    }
}
    else {
        document.querySelectorAll('.answer').forEach(ans => {
            ans.classList.remove('selected');
            ans.style.color = '';
            ans.style.backgroundColor = '';
            ans.innerText = '';
        })
        document.querySelectorAll('.question').forEach(q => {
            q.innerText = '';
        })
        game.style.display = 'none';
        document.querySelector('body').style.display = 'flex';
        initialPhase.style.display = 'inline-block';
        score = 0;
        currentAnswers = new Array(5);
        over = false;
        scoreBanner.innerText = '';
        checkBtn.innerText = 'Check Answers'
     }
}

checkBtn.addEventListener('click', () => checkAnswers(quizzes));
startQuizBtn.addEventListener('click', () => startGame())