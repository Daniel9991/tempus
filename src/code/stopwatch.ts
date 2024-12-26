const playButton = document.getElementById("play-button")
const mobilePlayButton = document.getElementById("mobile-play-button")
const pauseButton = document.getElementById("pause-button")
const mobilePauseButton = document.getElementById("mobile-pause-button")
const stopButton = document.getElementById("stop-button")
const mobileStopButton = document.getElementById("mobile-stop-button")
const lapButton = document.getElementById("lap-button")

const timeDisplay = document.getElementById("time-display")
const lapsSection = document.getElementById("laps-section")


// Format for stopwatch HH:MM:SS:Ms
// For stopwatch, time is stored as a number - amount of deciseconds (tenths of seconds) from the start
const DECISECONDS_PER_HOUR = 36000
const DECISECONDS_PER_MINUTE = 600
const DECISECONDS_PER_SECOND = 10
const REFRESH_RATE = 100

let time: number = 0
let intervalId: number
let laps: string[] = []

function formatNumToTwoPlaces(num: number): string{
  return num < 10 ? `0${num}` : String(num)
} 

function updateDisplay(formatedTime: string){
  timeDisplay.textContent = formatedTime
}

function formatTimeForDisplayStopwatch(time: number): string{
  if(time === 0) return "00:00:00.0"

  let hours = "00"
  let minutes = "00"
  let seconds = "00"
  let deciseconds = "0"
  let rest = time

  if(rest >= DECISECONDS_PER_HOUR){
    const hoursAmount = Math.floor(rest / DECISECONDS_PER_HOUR)
    hours = formatNumToTwoPlaces(hoursAmount)
    rest = rest % DECISECONDS_PER_HOUR
  }
  if(rest >= DECISECONDS_PER_MINUTE){
    const minutesAmount = Math.floor(rest / DECISECONDS_PER_MINUTE)
    minutes = formatNumToTwoPlaces(minutesAmount)
    rest = rest % DECISECONDS_PER_MINUTE
  }
  if(rest >= DECISECONDS_PER_SECOND){
    const secondsAmount = Math.floor(rest / DECISECONDS_PER_SECOND)
    seconds = formatNumToTwoPlaces(secondsAmount)
    rest = rest % DECISECONDS_PER_SECOND
  }
  if(rest > 0){
    deciseconds = String(rest)
  }

  return `${hours}:${minutes}:${seconds}.${deciseconds}`
}

function renderLapsSection(){
  if(laps.length === 0){
    lapsSection.innerHTML = `<p>No laps marked yet.</p>`
  }
  else{
    lapsSection.innerHTML = laps.map((lap, index) => `<p>Lap ${index + 1} - <span class="time">${lap}</span></p>`).join("")
  }
}

function stopwatchHandler(){
  time += 1
  const formattedTime = formatTimeForDisplayStopwatch(time)
  updateDisplay(formattedTime)
}

function play(){
  intervalId = setInterval(stopwatchHandler, REFRESH_RATE)
  playButton.setAttribute("disabled", "true")
  mobilePlayButton.setAttribute("disabled", "true")
  pauseButton.removeAttribute("disabled")
  mobilePauseButton.removeAttribute("disabled")
  mobilePauseButton.style.display = "block"
  stopButton.removeAttribute("disabled")
  mobileStopButton.removeAttribute("disabled")
  mobileStopButton.style.display = "none"
  lapButton.removeAttribute("disabled")
}

function pause(){
  clearInterval(intervalId)
  intervalId = undefined
  playButton.removeAttribute("disabled")
  mobilePlayButton.removeAttribute("disabled")
  pauseButton.setAttribute("disabled", "true")
  mobilePauseButton.setAttribute("disabled", "true")
  mobilePauseButton.style.display = "none"
  stopButton.removeAttribute("disabled")
  mobileStopButton.removeAttribute("disabled")
  mobileStopButton.style.display = "block"
  lapButton.setAttribute("disabled", "true")
}

function stop(){
  if(intervalId) clearInterval(intervalId)
  intervalId = undefined
  time = 0
  const formattedTime = formatTimeForDisplayStopwatch(time)
  updateDisplay(formattedTime)
  playButton.removeAttribute("disabled")
  pauseButton.setAttribute("disabled", "true")
  mobilePauseButton.setAttribute("disabled", "true")
  mobilePauseButton.style.display = "block"
  stopButton.setAttribute("disabled", "true")
  mobileStopButton.setAttribute("disabled", "true")
  mobileStopButton.style.display = "none"
  lapButton.setAttribute("disabled", "true")
  laps = []
  renderLapsSection()
}

function markLap(){
  laps.push(formatTimeForDisplayStopwatch(time))
  renderLapsSection()
}

playButton.addEventListener("click", play)
mobilePlayButton.addEventListener("click", play)
pauseButton.addEventListener("click", pause)
mobilePauseButton.addEventListener("click", pause)
stopButton.addEventListener("click", stop)
mobileStopButton.addEventListener("click", stop)
lapButton.addEventListener("click", markLap)
