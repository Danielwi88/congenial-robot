'use strict';
//getting the html element
const countdownElement = document.getElementById('countdown');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const inputHours = document.getElementById('inputHours');
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');

//variable utk countdown interval

let countdownInterval;

//function to start countdown
function startTimer() {
  //getting input values
  const hours = Number(inputHours.value) || 0;
  const minutes = Number(inputMinutes.value) || 0;
  const seconds = Number(inputSeconds.value) || 0;

  //convert total times to seconds
  let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

  //if total time is input, stop the function
  if (totalTimeInSeconds <= 0) {
    alert('Please enter a valid time.');
    return;
  }
  inputHours.value = '';
  inputMinutes.value = '';
  inputSeconds.value = '';

  //function to update time display every seconds
  countdownInterval = setInterval(() => {
    const days = Math.floor(totalTimeInSeconds / 86400);
    const hours = Math.floor((totalTimeInSeconds % 86400) / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = Math.floor(totalTimeInSeconds % 60);

    //update the HTML element display
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');

    //decrease the total time by one seconds
    totalTimeInSeconds--;

    //stop the timer if time runs out
    if (totalTimeInSeconds < 0) {
      clearInterval(countdownInterval);
      alert(`Time's up!`);

      //reset the input fields
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
    }
  }, 1000);
}
//add event listener for the start button
startButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
  startTimer();
});
