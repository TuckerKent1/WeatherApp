/*
    This script came from the W3 tutorial -- great canvas intro tutorial
*/
function startClock() { //creating function startClock()
    const canvas = document.getElementById("clock"); //getting reference to canvas element
    const ctx = canvas.getContext("2d"); //making element into canvas object
    const piNum = 3.14159; //setting pi to a variable to keep from having to reference Math.PI
    let radius = (canvas.height / 2); //setting the radius to half of the canvas' height so it centers on the canvas
    ctx.translate(radius, radius);//moves the starting or center point to the coordinates of radius(x), radius(y)
    radius = radius * 0.90; //now resetting the radius to 90% to leave space around the clock and the canvas border -- keeps overflow from happening
    setInterval(drawClock, 1000); //calling setInterval to invoke drawClock every 1 second

    function drawClock() { //function drawClock 
        drawFace(ctx, radius); //calling drawFace to draw clock face
        drawNumbers(ctx, radius); //calling drawNumbers to draw the numbers onto the clock face
        drawTime(ctx, radius); //this method gets the time and sets the hands of the clock appropriately
    }

    function drawFace(ctx, radius) { //drawFace function
        let grad; //declared variable grad -- I used the same variables as W3 because I had a few issues getting everything to work correctly

        ctx.beginPath(); //beginning step to draw the large circle of the clock (background circle)
        ctx.arc(0, 0, radius, 0, 2 * piNum, false); //sets path to a circle and sized by radius
        ctx.fillStyle = "white"; //color of circle will be white --
        ctx.fill(); //filling circle

        grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05); //creating gradient for outter rim of clock face -- inner at 95% of circle outer at 105%
        grad.addColorStop(0, "#333333"); //inside color
        grad.addColorStop(0.5, "white"); //center of gradient circle goes to white
        grad.addColorStop(1, "#333333"); //outside color black/grey
        ctx.strokeStyle = grad; //setting the strokeStyle for stroke() method
        ctx.lineWidth = (radius * 0.10); //setting the width of the gradient 10% of the circle
        ctx.stroke(); //drawing gradient circle

        ctx.beginPath(); //begin path for the inside circle of the clock
        ctx.arc(0, 0, radius * 0.10, 0, 2*piNum); //circle size is the inner 10%
        ctx.fillStyle = "#333"; //setting color of circle
        ctx.fill(); //drawing/filling the circle
    }

    function drawNumbers(ctx, radius) { //function to draw the numbers on the clock
        let angle; //declaring angle variable
        let clockNum; //declaring variable for the clock numbers

        ctx.font = radius * 0.15 + "px arial"; //setting font size and family
        ctx.textBaseline = "middle"; //where the number will sit in relation to its location
        ctx.textAlign = "center"; //center aligned on the location baseline
        for(clockNum = 1; clockNum < 13; clockNum++){ // for loop to iterate the numbers
            angle = clockNum * piNum / 6; //getting / setting angle 
            ctx.rotate(angle); //rotating canvas to angle
            ctx.translate(0, -radius * 0.85); //moving the center point for number placement
            ctx.rotate(-angle); //rotating back to normal canvas position with new starting point from translate
            ctx.fillText(clockNum.toString(), 0, 0); //setting number to position
            ctx.rotate(angle); //rotating canvas 
            ctx.translate(0, radius * 0.85); //moving start point to new position
            ctx.rotate(-angle); //rotating canvas back with new translate start point
        }
    }

    function drawTime(ctx, radius) { //drawTime gets the time for each hand and calls method to draw the hand in the right place
        let now = new Date(); //getting and setting new date object
        let hours = now.getHours(); //getting hours from date object
        let minutes = now.getMinutes(); //gettin minutes from date object
        let seconds = now.getSeconds(); //getting seconds from date object

        hours = hours % 12; //setting hours to new hours with modulus operation
        hours = (hours * piNum / 6) + (minutes * piNum / (6 * 60)) + (seconds * piNum / (360 * 60)); //getting positiong for hour hand
        drawHand(ctx, hours, radius * 0.5, radius * 0.07); //drawing hour hand to clock face

        minutes = (minutes * piNum / 30) + (seconds * piNum / (30 * 60)); //getting position specifics for minute hand
        drawHand(ctx, minutes, radius * 0.8, radius * 0.07); //drawing minute hand to clock face

        seconds = (seconds * piNum / 30); //getting position for seconds hand
        drawHand(ctx, seconds, radius * 0.9, radius * 0.02); //drawing second hand to clock face

    }

    function drawHand(ctx, pos, length, width) { //function the draws the clock hands
        ctx.beginPath(); //begging draw path
        ctx.lineWidth = width; //setting line width to specified width as passed to function
        ctx.lineCap = "round"; //setting style for the end of the drawn line -- round tip
        ctx.moveTo(0, 0); //moving starting position
        ctx.rotate(pos); //rotating canvas
        ctx.lineTo(0, -length); //setting path for the hand to be drawn
        ctx.stroke(); //drawing hand
        ctx.rotate(-pos); //rotating canvas back to start postion
    }

}