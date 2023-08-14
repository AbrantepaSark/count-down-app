let countdown;

const timeLeftElement = document.querySelector(".display__time-left")
const endTimeElement = document.querySelector(".display__end-time")
const buttonElements = document.querySelectorAll(".timer__button")
const formElement = document.querySelector("#custom")
const inputElement = formElement.elements["minutes"]

function countdownTimer(seconds) {
  const future = Date.now() + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(future)
  countdown = setInterval(() => {
    const now = Date.now()
    const secondsLeft = Math.round((future - now) / 1000)

    if (secondsLeft < 0) {
      clearInterval(countdown)
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000)
}

function displayTimeLeft(secondsLeft) {
  //eg 70s == 1mn 10s
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const displayTime = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  timeLeftElement.textContent = displayTime
}

function displayEndTime(timeInMilliseconds) {
  const endTime = new Date(timeInMilliseconds)
  const hour24format = endTime.getHours()

  let hour;
  if (hour24format > 12) hour = hour24format - 12
  else if (hour24format === 0) hour = 12
  else hour = hour24format

  const minutes = endTime.getMinutes()
  const AMPM = hour24format >= 12 ? "PM" : "AM"

  const endTimeDisplay = `Be Back At ${hour}:${minutes < 10 ? "0" : ""}${minutes}${AMPM}`
  endTimeElement.textContent = endTimeDisplay
}

function startTimer() {
  clearInterval(countdown)
 // console.log(this.dataset)
  const seconds = parseInt(this.dataset.time);
  countdownTimer(seconds)
}

buttonElements.forEach(button => button.addEventListener("click", startTimer))

formElement.addEventListener("submit", (even) => {
  event.preventDefault()

  const seconds = inputElement.value * 60
  //console.log(seconds)
  clearInterval(countdown)
  countdownTimer(seconds)
  inputElement.value = ""
})


countdownTimer(5)

