const addBtn = document.querySelector('.add-btn')

const notes = JSON.parse(localStorage.getItem('notes'))

notes.forEach(note => {
  addNote(note)
})

addBtn.addEventListener('click', () => {
  addNote()
})

function addNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')
  note.innerHTML = `
    <div class="btn-group">
      <button class="edit-btn"><i class="fas fa-edit"></i></button>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>
    <div class="main"></div>
    <textarea class="hidden"></textarea>
  `
  const editBtn = note.querySelector('.edit-btn')
  const deleteBtn = note.querySelector('.delete-btn')

  const main = note.querySelector('.main')
  const textArea = note.querySelector('textArea')

  main.innerHTML = marked.parse(text)
  textArea.innerHTML = text

  editBtn.addEventListener('click', () => {
    editBtn.classList.toggle('active')
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })
  deleteBtn.addEventListener('click', () => {
    note.remove()
    updateLS()
  })

  document.body.appendChild(note)

  textArea.addEventListener('input', e => {
    const { value } = e.target
    main.innerHTML = marked.parse(value)
    updateLS()
  })
}

function updateLS() {
  const textAreas = document.querySelectorAll('textarea')
  const notesLS = []
  textAreas.forEach(note => {
    notesLS.push(note.value)
  })
  localStorage.setItem('notes', JSON.stringify(notesLS))
}




