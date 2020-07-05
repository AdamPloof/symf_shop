import $ from 'jquery';

// CSS
import '../css/app.css';
import '../css/bootstrap.min.css';
import '../css/styles.css';
  
console.log('app.js loaded!');
$(document).ready(() => {
    hideBouncyBox();
    setCallTimer();
})

function hideBouncyBox() {
    const bouncyBox = document.getElementById("box-bouncy");
    if (bouncyBox) {
        setTimeout(() => {
            bouncyBox.style.display = 'none'
        }, 7000);
    }
}

function setCallTimer() {
    const timerContainer = document.getElementById('box-timer');
    if (!timerContainer) {
        // Bail out if the timer container doesn't exist
        return;
    }

    // Creating a date object out of the element.dataset.starttime value
    // This will give us our initial elapsed time 
    let date = timerContainer.dataset.starttime.slice(0, 10).split('-');
    let time = timerContainer.dataset.starttime.slice(11, ).split(':');
    let year = date[0];
    let month = date[1] - 1; // Months in JS are zero indexed!
    let day = date[2];
    let hour = time[0];
    let minute = time[1];
    let second = time[2];
    var startTime = Math.floor(new Date(year, month, day, hour, minute, second).getTime() / 1000);
    countTime();

    function countTime() {
        // Check the time against the system time and update every half second
        let now = Math.floor(new Date().getTime() / 1000);
        let timeElapsed = now - startTime;
    
        let timerHour = formatTime(Math.floor(timeElapsed / 3600));
        let timerMinute = formatTime(Math.floor(timeElapsed % 3600 / 60));
        let timerSecond = formatTime(timeElapsed % 60);
    
        timerContainer.innerHTML = timerHour + ':' + timerMinute + ':' + timerSecond;
        let t = setTimeout(countTime, 500);
    }
}

function formatTime(unit) {
    let timeStr = unit.toString()
    let formattedTime = '';
    if (timeStr.length < 2) {
        formattedTime = "0" + timeStr;
    } else {
        formattedTime = timeStr;
    }
    return formattedTime;
}
