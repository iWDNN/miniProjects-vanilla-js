const NEW_YEAR = '1 Jan ' + (new Date().getFullYear() + 1)

const daysEl = document.querySelector('.big_text.days')
const hoursEl = document.querySelector('.big_text.hours')
const minsEl = document.querySelector('.big_text.mins')
const secEl = document.querySelector('.big_text.sec')

function _formatTime(time) {
  return time < 10 ? `0${time}` : time
}

function countTime() {
  const newYear = new Date(NEW_YEAR)
  const currentDate = new Date()
  const totalSeconds = (newYear - currentDate) / 1000

  const days = Math.floor(totalSeconds / 3600 / 24)
  const hours = Math.floor(totalSeconds / 3600) % 24
  const mins = Math.floor(totalSeconds / 60) % 60
  const sec = Math.floor(totalSeconds) % 60

  daysEl.innerText = _formatTime(days)
  hoursEl.innerText = _formatTime(hours)
  minsEl.innerText = _formatTime(mins)
  secEl.innerText = _formatTime(sec)
}

countTime()
setInterval(countTime, 1000)