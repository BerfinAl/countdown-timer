const countdown = document.querySelector(".countdown-clock");
const beBackAt = document.querySelector(".countdown-beback");
const options = document.querySelectorAll(".option");
const form = document.querySelector("form");
const input = document.querySelector("input");

let countdownInterval;

function beBackAtWhen(total) {
  const now = new Date();
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();
  const nowSecond = now.getSeconds();
  const nowTotalSec = nowSecond + nowMinute * 60 + nowHour * 3600;
  const bebackTotal = nowTotalSec + total;

  let hours = Math.floor(bebackTotal / 3600);
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes = Math.floor((bebackTotal % 3600) / 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  beBackAt.innerHTML = `Be back at ${hours}:${minutes}`;
}

function startTimer(duration, display) {
  clearInterval(countdownInterval);

  input.value = null;

  let timer = duration,
    minutes,
    seconds;
  countdownInterval = setInterval(function () {
    minutes = parseInt(timer / 60);
    seconds = parseInt(timer % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    document.querySelector("title").textContent = minutes + ":" + seconds;

    if (--timer < 0) clearInterval(countdownInterval);
  }, 1000);
}

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    const countdownDate = e.target.dataset.time;
    countdown.innerHTML = countdownDate;
    const total =
      Number(countdownDate.split(":")[1]) +
      Number(countdownDate.split(":")[0]) * 60;

    options.forEach((otherOption) => {
      otherOption.classList.remove("active");
    });

    e.target.classList.add("active");
    startTimer(total, countdown);

    beBackAtWhen(total);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const seconds = Number(input.value * 60);
  startTimer(seconds, countdown);
  beBackAtWhen(seconds);
});
