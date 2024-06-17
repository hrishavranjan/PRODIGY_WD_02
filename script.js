let startTime = 0;
let currentTime = 0;
let intervalId = null;
let isRunning = false;
let lapTimes = [];

const startButton = document.getElementById('buttonPlay');
const pauseButton = document.getElementById('buttonPause');
const resetButton = document.getElementById('buttonReset');
const lapButton = document.getElementById('buttonLap');
const displayElement = document.getElementById('display');
const lapTimesList = document.getElementById('lapTimesList');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
  startTime = Date.now() - currentTime;
  intervalId = setInterval(updateTime, 10);
  isRunning = true;
  startButton.style.display = 'none';
  pauseButton.style.display = 'inline-flex';
  lapButton.disabled = false;
}

function pause() {
  clearInterval(intervalId);
  currentTime = Date.now() - startTime;
  isRunning = false;
  startButton.style.display = 'inline-flex';
  pauseButton.style.display = 'none';
  lapButton.disabled = true;
}

function reset() {
  clearInterval(intervalId);
  startTime = 0;
  currentTime = 0;
  isRunning = false;
  lapTimes = [];
  displayElement.textContent = '00:00:00.000';
  startButton.style.display = 'inline-flex';
  pauseButton.style.display = 'none';
  lapButton.disabled = true;
  lapTimesList.innerHTML = '';
}

function updateTime() {
  currentTime = Date.now() - startTime;
  const hours = Math.floor(currentTime / 3600000);
  const minutes = Math.floor((currentTime % 3600000) / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const milliseconds = Math.floor((currentTime % 1000));
  displayElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

function padMilliseconds(number) {
  return number.toString().padStart(3, '0');
}

function recordLap() {
  const lapTime = displayElement.textContent;
  lapTimes.push(lapTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
  lapTimesList.appendChild(lapItem);
}
