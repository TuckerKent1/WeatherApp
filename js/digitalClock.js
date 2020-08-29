function startDigitalClock() {
    const clockDiv = document.getElementById("digitalClock"); //div in index.html
    setInterval(drawClock, 1000);

    function drawClock() {
        let amPm;
        let currentTime = new Date();
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let seconds = currentTime.getSeconds();

        //default is military time -- setting to subtract 12 to keep hours 1 through 12
        if(hours > 12){
            hours = hours - 12;
        }

        //resets hour to 12 at midnight
        if(hours == 0){
            hours = 12;
        }

        //adding 0 to minutes less than 10 -- 09 instead of just 9
        if(minutes < 10){
            minutes = "0" + minutes;
        }

        //adding 0 to seconds less than 10 
        if(seconds < 10){
            seconds = "0" + seconds;
        }

        //setting am - pm 
        if(currentTime.getHours() >= 12){
            amPm = "PM";
        } else {
            amPm = "AM";
        }

        let clockString = `${hours}:${minutes}:${seconds} ${amPm}`;
        clockDiv.innerHTML = clockString;
    }
}