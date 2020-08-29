window.addEventListener('load', () => { //event listener on load event to call code

    //declaring and setting elements from index.html
    const leftDiv = document.getElementById("leftWxHolder");
    const centerDiv = document.getElementById("centerWxHolder");
    const rightDiv = document.getElementById("rightWxHolder"); 
    const bannerHolder = document.getElementById("bannerHolder");
    const errorHolder = document.getElementById("errorHolder");
    const clockSlider = document.getElementById("clockSelector");
    const canvasEl = document.getElementById("analogClock");
    const digitalEl = document.getElementById("digitalClock")
    const clockH4 = document.getElementById("clockType");
    let zipBox = document.getElementById("zipBox"); //input form element
    let dataAttList = document.querySelectorAll("button"); //return collection of button elements
    let userLat; //latitude variable
    let userLong; //longitude variable
    let zipBool;

    //options for geolocation
    const geoOptions = {
        enableHighAccuracy: true,
    }

    //starting both clocks
    startAnalogClock();
    startDigitalClock();

    //changing clock type display based on range slider value -- default is analog clock
    clockSlider.addEventListener("change", () => {
        if(clockSlider.value == 0){
            digitalEl.setAttribute("class", "hidden");
            canvasEl.setAttribute("class", "visible");
            clockH4.innerHTML = "";
            clockH4.innerHTML = `<strong>Analog</strong> / Digital`;
        } else {
            canvasEl.setAttribute("class", "hidden");
            digitalEl.setAttribute("class", "visible");
            clockH4.innerHTML = "";
            clockH4.innerHTML = `Analog / <strong>Digital</strong>`;
        }
    });

    //getting users current location
    navigator.geolocation.getCurrentPosition(getCoords, geoError, geoOptions); //calling geolocation API --invokes getCoords() below

    //click event for weather forecast buttons
    document.addEventListener("click", (event) => { //adding event listener for click event on document -- for all buttons in one event
        if(event.target === dataAttList[0]){ //if the click occurs on the get current weather button
            getCurrentWX(null); //calls method to get current weather -- geo api
            clearError();
            let errorString = currentVal();
            displayError(errorString);
        } else if(event.target === dataAttList[1]){
            getFiveDay(null); //calls method to retrieve five day forecast -- geo api
            clearError();
            let errorString = currentVal();
            displayError(errorString);
        } else if(event.target === dataAttList[2]){
            clearError();
            getCurrentWX(zipBox.value); // current weather button -- zip
        } else if(event.target === dataAttList[3]){
            clearError();
            getFiveDay(zipBox.value); //3 hour forecast -- zip
            
        }
    });

    //getting and storing lat and long
    function getCoords(position) { //function to store lat and lon coordinates from geolocation
        userLat = position.coords.latitude; //storing latitude
        userLong = position.coords.longitude; //storing longitude
    }

    //optional error callback for geolocation 
    function geoError(error) {
        let errorMessage = `Error: ${error.code}\n ${error.message}`;
        displayError(errorMessage);
    }

    //function fetches, formats, and displays current weather 
    function getCurrentWX(zipCode) {
        zipBool = true;
        let weatherURL = "";
        if(zipCode == null){
            weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&units=imperial&appid=a0452beb301c4a3af9f5c0fda6bdcc97`; //geo api
        } else {
            weatherURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=a0452beb301c4a3af9f5c0fda6bdcc97`; //zip
        }
        fetch(weatherURL) //calling fetch API
        .then((response) => { //when response returns
            if(response.ok){ //if response is okay
                return response.json(); //returning response as json object
            }
            throw new Error(response.statusText); //if error logs the status
        })
        .then(data => { //json data
            leftDiv.innerHTML = ""; //setting the innerHTML of the current weather div to blank to keep from repeating
            centerDiv.innerHTML = ""; //resetting div in case of multiple calls
            rightDiv.innerHTML = ""; //resetting div in case of multiple calls
            bannerHolder.innerHTML = "";

            let location = document.createElement("h2");
            location.innerHTML = `${data.name}`;

            let currentH3 = document.createElement("h3");
            currentH3.innerHTML = "Current Weather";
            let hr1 = document.createElement("hr");

            bannerHolder.appendChild(location);
            bannerHolder.appendChild(currentH3);
            bannerHolder.appendChild(hr1);

            let innerDiv1 = document.createElement("div");
            let innerDiv2 = document.createElement("div");
            let innerDiv3 = document.createElement("div");
            innerDiv1.innerHTML = `Current Temp: ${data.main.temp}${"&#176"} F`; 
            innerDiv2.innerHTML = `Max Temp: ${data.main.temp_max}${"&#176"} F`;
            innerDiv3.innerHTML = `Min Temp: ${data.main.temp_min}${"&#176"} F`;

            let iconCode = `${data.weather[0].icon}`;
            getIcon(iconCode);

            centerDiv.appendChild(innerDiv1);
            centerDiv.appendChild(innerDiv2);
            centerDiv.appendChild(innerDiv3);
        })
        .catch(error => {
            console.log("Error occurred during fetch operations " + error);
            zipBool = false;
            let errorString = zipVal();
            displayError(errorString);
        }); //if error log to console
    }

    //function fetches, formats, and displays 3 hour forecast
    function getFiveDay(zipCode) {
        zipBool = true;
        let fiveDayURL = "";
        if(zipCode == null){
            fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLong}&units=imperial&appid=a0452beb301c4a3af9f5c0fda6bdcc97`; //geo api
        } else {
            fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=imperial&appid=a0452beb301c4a3af9f5c0fda6bdcc97`; //zip
        }
        fetch(fiveDayURL) //calling on fetch api
        .then((response) => { //when response is received
            if(response.ok){ //if response is okay
                return response.json(); //returning response as json object
            }
            throw new Error(response.statusText); //if error -- logging
        })
        .then(data => { //working with json data returned
            leftDiv.innerHTML = ""; //resetting div in case of multiple calls
            centerDiv.innerHTML = ""; //resetting div in case of multiple calls
            rightDiv.innerHTML = ""; //resetting div in case of multiple calls
            bannerHolder.innerHTML = "";
            let h2 = document.createElement("h2"); //creating h2 element
            h2.innerHTML = `${data.city.name}`; //setting city name in h2 element

            let innerH3 = document.createElement("h3");
            innerH3.innerHTML = `3 Hour Forecast`;

            let hr2 = document.createElement("hr");

            bannerHolder.appendChild(h2);
            bannerHolder.appendChild(innerH3);
            bannerHolder.appendChild(hr2);
            
            for(let i = 0; i < 3; i++){ //data.list[i] -- for loop to iterate through the first 3 returned forecast times
                let responseTime = `${data.list[i].dt_txt}`; //getting forecast time from json data
                let dateTime = new Date(responseTime);  //creating date object with forecast time returned
                let forecastTime = dateTime.toLocaleTimeString(); //setting forecastTime to a more suitable format

                let innerDiv1 = document.createElement("div");
                innerDiv1.innerHTML = `Forecast Time(UTC): ${forecastTime}`;

                let innerDiv2 = document.createElement("div");
                innerDiv2.innerHTML = `Temperature: ${data.list[i].main.temp}${"&#176"} F`;

                let innerDiv3 = document.createElement("div");
                innerDiv3.innerHTML = `Max Temperature: ${data.list[i].main.temp_max}${"&#176"} F`;

                let innerDiv4 = document.createElement("div");
                innerDiv4.innerHTML = `Min Temperature: ${data.list[i].main.temp_min}${"&#176"} F`; 

                let wXInstance = new WeatherForecast(dateTime, data.list[i].main.temp, data.list[i].main.temp_min, data.list[i].main.temp_max); //creating instance of WeatherForecast class with json data
                let dateDisplay = document.createElement("h4"); //creating h4 element to display wXInstance data
                dateDisplay.innerHTML = wXInstance.getDayString(); //calling getDayString() mthod of WeatherForecast class

                //IF statement controlling which flexbox each 3hr forecast is passed to
                if(i == 0){
                    leftDiv.appendChild(dateDisplay);
                    leftDiv.appendChild(innerDiv1);
                    leftDiv.appendChild(innerDiv2);
                    leftDiv.appendChild(innerDiv3);
                    leftDiv.appendChild(innerDiv4);
                } else if(i ==1){
                    centerDiv.appendChild(dateDisplay);
                    centerDiv.appendChild(innerDiv1);
                    centerDiv.appendChild(innerDiv2);
                    centerDiv.appendChild(innerDiv3);
                    centerDiv.appendChild(innerDiv4);
                } else {
                    rightDiv.appendChild(dateDisplay);
                    rightDiv.appendChild(innerDiv1);
                    rightDiv.appendChild(innerDiv2);
                    rightDiv.appendChild(innerDiv3);
                    rightDiv.appendChild(innerDiv4);
                }
            }
        })
        .catch(error => {
            console.log("Error occurred during fetch operations " + error);
            zipBool = false;
            let errorString = zipVal();
            displayError(errorString);
        }); //if error occurs during fetch -- logging 
    }

    //fetch and display weather icon
    function getIcon(iconCode){
        let iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

        fetch(iconURL)
        .then((response) => { //when response is received
        if(response.ok){ //if response is okay
            return response.blob(); //returning response as json object
        }
        throw new Error(response.statusText); //if error -- logging to console
        })
        .then(blob => {
            let blobURL = URL.createObjectURL(blob);
            let iconImage = document.createElement("img");
            iconImage.setAttribute("src", blobURL);
            rightDiv.appendChild(iconImage);
            })
        .catch(error => console.log(error + "Error occurred during image fetch"));
    }

    //clears the error holder div and sets class to hidden
    function clearError() {
        errorHolder.innerHTML = "";
        errorHolder.setAttribute("class", "hidden");
    }

    //validation for zipcode entry
    function zipVal() {
        let errorString = "";
        let zip = zipBox.value;
        zip = zip.toString();
        if (zip.length !== 5 && zip.length > 0){
            let zipMessage = `Zip Code can only contain 5 digits`;
            return zipMessage;
        } else if (zipBool == false && userLat !== undefined && userLong !== undefined){
            let invalidMessage = `Uh oh, the Zip Code you entered may not exist or the weather application may be experiencing issues. Enter a valid code or try again later`;
            return invalidMessage;
        } else {
            return errorString;
        }
    }

    //validation for current location when retrieving weather
    function currentVal() {
        let errorString = "";
        if(userLat == undefined && userLong == undefined){
            let geoMessage = `To use current location, reload the page and select allow when prompted`;
            errorString += geoMessage;          
        }
        return errorString;
    }

    //function to display errors in errorHolder div
    function displayError(errorString){
        if(errorString !== ""){
            let errUl = document.createElement("ul");
            let errLi = document.createElement("li");
            errLi.innerText = errorString;
            errorHolder.appendChild(errUl);
            errorHolder.appendChild(errLi);
            errorHolder.setAttribute("class", "visible");
            errorHolder.setAttribute("class", "errorBox");
        }
    }


});