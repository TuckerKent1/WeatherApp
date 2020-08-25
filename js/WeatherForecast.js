class WeatherForecast { //creating WeatherForecast class

    constructor(date, temp, min, max) { // constructor for class
        this.date = date; //setting date passed
        this.temp = temp; //setting temperature passed
        this.min = min; //setting min temperature passed
        this.max = max; //setting max temperature passed
    }

    /*
        only created getters for each instance field
    */
    getDate() {
        return this.date;
    }

    getTemp() {
        return this.temp;
    }

    getMinTemp() {
        return this.min;
    }

    getMaxTemp() {
        return this.max;
    }

    getDayString() {
        let day = this.date.getDay();
        let dayAbbr;
        switch (day) {
            case 0: //if day is 0
                dayAbbr = "Sun";
                break;
            case 1: //if day is 1
                dayAbbr = "Mon"; //sets string to Mon
                break;
            case 2: //if day is 2
                dayAbbr = "Tue"; //sets string to Tue
                break;
            case 3: //if day is 3
                dayAbbr = "Wed"; //sets string to Wed
                break;
            case 4: //if day is 4
                dayAbbr = "Thu"; //sets string to Thu
                break;
            case 5: //if day is 5
                dayAbbr = "Fri"; //sets string to Fri
                break;
            case 6: //if day is 6
                dayAbbr = "Sat"; //sets string to Sat
                break;

        }
        let month = this.date.getMonth();
        let dayNum = this.date.getDate();
        let dayString = `${dayAbbr}, ${month + 1}/${dayNum}`; //declaring and setting dayString to template literal with return value
        return dayString; //returns string to caller
    }

}