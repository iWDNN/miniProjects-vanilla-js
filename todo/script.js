const formEl = document.getElementById('form')
const todoInputEl = document.getElementById('todo-input')
const todoUl = document.getElementById('todos')

const todosLS = JSON.parse(localStorage.getItem('todos'))

if (todosLS) {
  todosLS.forEach(todo => {
    addTodo(todo)
  })
}

form.addEventListener('submit', e => {
  e.preventDefault()
  addTodo()
  todoInputEl.value = ''
  updateLS()
})

function addTodo(todo) {
  const todoEl = document.createElement('li')
  todoEl.innerHTML = `
    <div class="start-end">
      <div class="start">
        <h4 class="date"></h4>
        <h4 class="time"></h4>
      </div>
      <div class="end">
        <h4 class="date"></h4>
        <h4 class="time"></h4>
      </div >
    </div >
    <h2 class=""></h2>
    <div class="btn-group">
      <button class="status-btn"><i class="fas fa-hourglass-end"></i>⌛️</button>
      <button class="check-btn"><i class="fas fa-check"></i>✅</button>
      <button class="delete-btn"><i class="fas fa-trash"></i>❌</button>
    </div>
  `
  const current = new Date()
  const currentDate = `${_formatNum((current.getMonth() + 1))} ${_formatNum(current.getDate())} ${current.getFullYear()} `
  const currentTime = `${_formatNum(current.getHours())}:${_formatNum(current.getMinutes())} `

  const endEl = todoEl.querySelector('.start-end .end')

  const startDateEl = todoEl.querySelector('.start .date')
  const startTimeEl = todoEl.querySelector('.start .time')

  const endDateEl = todoEl.querySelector('.end .date')
  const endTimeEl = todoEl.querySelector('.end .time')

  const textEl = todoEl.querySelector('h2')

  const btnGrpEl = todoEl.querySelector('.btn-group')
  const deleteBtn = todoEl.querySelector('.btn-group .delete-btn')

  if (todo) {
    startDateEl.innerText = todo.startDate
    startTimeEl.innerText = todo.startTime
    if (todo.endDate && todo.endTime) {
      endDateEl.innerText = todo.endDate
      endTimeEl.innerText = todo.endTime
    }
    if (todo.completed) {
      endEl.classList.add('completed')
      textEl.classList.add('completed')
      btnGrpEl.classList.add('completed')
    }
    textEl.innerText = todo.text
  } else {
    startDateEl.innerText = currentDate
    startTimeEl.innerText = currentTime

    textEl.innerText = todoInputEl.value
  }
  textEl.addEventListener('click', () => {
    if (textEl.classList.contains('completed')) {
      endDateEl.innerText = ''
      endTimeEl.innerText = ''
    } else {
      endDateEl.innerText = currentDate
      endTimeEl.innerText = currentTime
    }
    btnGrpEl.classList.toggle('completed')
    endEl.classList.toggle('completed')
    textEl.classList.toggle('completed')
    updateLS()
  })
  deleteBtn.addEventListener('click', () => {
    todoEl.remove()
    updateLS()
  })


  todoUl.appendChild(todoEl)
}

function updateLS() {
  const todosEl = document.querySelectorAll('li')
  const todos = []

  todosEl.forEach(todo => {
    // console.log(todo.querySelector('h2').classList.contains('completed'))
    todos.push({
      completed: todo.querySelector('h2').classList.contains('completed'),
      startDate: todo.querySelector('.start .date').textContent,
      startTime: todo.querySelector('.start .time').textContent,
      endDate: todo.querySelector('.end .date').textContent,
      endTime: todo.querySelector('.end .time').textContent,
      text: todo.querySelector('h2').textContent
    })
  })
  // console.log(todos)
  localStorage.setItem('todos', JSON.stringify(todos))
}


function _formatNum(num) {
  return num < 10 ? `0${num}` : num
}