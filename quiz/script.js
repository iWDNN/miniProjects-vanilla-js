const quizData = [
  {
    questions: '2018년 러시아 올림픽에 도입된 "비디오 판독 시스템" 이름은?',
    a: 'VAR',
    b: 'VCR',
    c: 'VTR',
    correct: 'a'
  },
  {
    questions: '우리나라 최초의 배달 음식은?',
    a: '설렁탕',
    b: '짜장면',
    c: '해장국',
    correct: 'c'
  },
  {
    questions: '아리랑 가사에 등장하는 "십리도 못 가서 발병 난다" 중 "십리(10)"는 몇 킬로미터에 해당 될까?',
    a: '1km',
    b: '4km',
    c: '10km',
    correct: 'b'
  },
  {
    questions: '힙합 등에서 자주 볼 수 있는 멋짐 표현 중 하나가 "스웨그"다. 이 "스웨그"라는 말을 처음 쓴 사람은 누구?',
    a: '투팍',
    b: '에미넘',
    c: '세익스피어',
    correct: 'c'
  },
  {
    questions: '정약용 선생이 추천한 피서법이 아닌 것은?',
    a: '숲 속에서 매미 소리 듣기',
    b: '느티나무 아래에서 그네 타기',
    c: '조용히 앉아서 책 보기',
    correct: 'c'
  },
]

const mobileCtEl = document.querySelector('.mobile-container')
const quesCtEl = document.querySelector('.question-container')
const btngrpEl = document.querySelector('.btn-grp')
const currentStateEl = document.querySelector('.current-status')
const allStateEl = document.querySelector('.all-status')
const wrongEl = document.querySelector('.wrong')
const correctEl = document.querySelector('.correct')
const currentBarEl = document.querySelector('.current-bar')

const questionEl = document.querySelector('.question')
const aEl = document.getElementById('a')
const bEl = document.getElementById('b')
const cEl = document.getElementById('c')
const answersEl = document.querySelectorAll('.btn-group .answer')

const submitBtnEl = document.querySelector('.submitBtn')

let currentQuiz = 0
let score = 0
let wrong = 0

function loadQuiz() {

  currentStateEl.innerText = `# ${currentQuiz + 1}`
  allStateEl.innerText = `of ${quizData.length}`

  wrongEl.innerText = wrong
  correctEl.innerText = score

  currentBarEl.style.width = (currentQuiz / quizData.length) * 100 + '%'
  questionEl.innerText = quizData[currentQuiz].questions

  aEl.innerText = quizData[currentQuiz].a
  bEl.innerText = quizData[currentQuiz].b
  cEl.innerText = quizData[currentQuiz].c

}
loadQuiz()

function getSelected() {
  let answer = undefined
  answersEl.forEach(async (answerEl) => {
    if (answerEl.classList.contains('active')) {
      answer = answerEl.textContent
    }
  })
  return answer
}
function submit() {
  const answer = getSelected()
  console.log(currentQuiz)
  if (answer) {
    if (quizData[currentQuiz].correct == answer.toLowerCase()) {
      score++
    } else {
      wrong++
    }
    currentQuiz++
    if (currentQuiz < quizData.length) {
      loadQuiz()
      resetSelect()
    } else {
      document.querySelector('.status').remove()
      document.querySelector('.status-bar').remove()
      document.querySelector('.question').remove()
      document.querySelector('.answers').remove()
      document.querySelector('.btn-group').remove()
      quesCtEl.remove()
      if (score == quizData.length) {
        document.querySelector('.section').innerHTML = `
          <div class="wrap">
            <i class="far fa-surprise"></i>
            <h3>${score} / ${quizData.length}</h3>
            <h2>Congratulations! Perfect!</h2>
          </div>
          `
      }
      else if (score / quizData.length > 0.5) {
        document.querySelector('.section').innerHTML = `
          <div class="wrap">
            <i class="far fa-smile"></i>
            <h3>${score} / ${quizData.length}</h3>
            <h2>Good!</h2>
            <button onclick="location.reload()" class="btn retry">Retry!</button>
          </div>
          `
      } else {
        document.querySelector('.section').innerHTML = `
          <div class="wrap">
            <i class="fas fa-fire"></i>
            <h3>${score} / ${quizData.length}</h3>
            <h2>Cheer up!</h2>
            <button onclick="location.reload()" class="btn retry">Retry!</button>
          </div>
          `
      }
    }
  }
}
function resetSelect() {
  answersEl.forEach(answerEl => {
    answerEl.classList.remove('active')
  })
}

answersEl.forEach(answerEl => {
  answerEl.addEventListener('click', () => {
    if (answerEl.classList.contains('active')) {
      answerEl.classList.remove('active')
    } else
      answerEl.classList.add('active')
  })
})

submitBtnEl.addEventListener('click', submit)


// CSS help

const fadeEls = document.querySelectorAll('.question-container .fade-in')
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 0.2) * .4,
    opacity: 1
  })
})