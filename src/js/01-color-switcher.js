const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

stopBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let colorInterval;

function onStartClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  colorInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  clearInterval(colorInterval);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}
