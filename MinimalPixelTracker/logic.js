var CONE_COUNT = 2;//aka City Count

//track_cones or track_ball
var STATE = "track_cones";

var identified_cones = []//The final array of cones 
//e.g = [  rect , rect , rect , rect ]

//ONLY VALIDATED BALL POSITION
var last_ball_pos = { x: 0, y: 0 }

var BALL_DIST_THRESHOLD = 50;

var canvas;
var context;

function identifyCones() {
    alert('A function that displays boxes around the current cones')
}

//Start Tracking - Entry Point
//1. Find Cones (pixel positions stored in ...)
//2. Start tracking ball. Report position
window.onload = function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    //Setup Ball Identifying Color
    tracking.ColorTracker.registerColor('ball_color', function (r, g, b) {
        return (r > 240 && g > 240 && b > 240);//true/false
    });

    //Setup Cone Identifying Color
    tracking.ColorTracker.registerColor('cone_color', function (r, g, b) {
        return (r > 150 && g < 80 && b < 80);//true/false
    });

    var ballTracker = new tracking.ColorTracker('ball_color');
    var coneTracker = new tracking.ColorTracker('cone_color');

    tracking.track('#video', ballTracker, { camera: true });
    tracking.track('#video', coneTracker, { camera: true });

    coneTracker.on('track', function (event) {
        // console.log("Still trying to track the cones?"); 
        // can't just unsubscribe? Will still be tracking it?
        if (STATE == "track_cones") {
            console.log("Tracking Cones..");
            trackCones(event, canvas, context);
        }
    });

    ballTracker.on('track', function (event) {
        if (STATE == "track_ball") {
            console.log("Tracking Balls..");
            trackBall(event, canvas, context);
        }
    });
};


function changeState() {
    STATE = (STATE == 'track_ball') ? 'track_cones' : 'track_ball';
    document.getElementById("current-tracking-btn").innerHTML = STATE;
}


function trackCones(event, canvas, context) {
    //clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Handle tracked objects
    resultCount = event.data.length;
    var validCount = 0;
    event.data.forEach(function (rect) {
        //Check if rect is valid function
        //<<< INSERT VALIDATE FUNCTION HERE >>>>//

        //At this point it is valid
        validCount++;

        //Save the entire rect in identified_cones
        

        //Draw it.
        context.strokeStyle = '#FF0000';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);

        if (validCount == CONE_COUNT) {
            console.log("We identified all the cones");
            changeState();
        } else if (validCount < CONE_COUNT) {
            console.log("We need more cones");
        } else {
            console.log("We identified too many cones");
        }
    });
}



//Dont use cur_pos as ball position... 
var cur_pos = { x: 0, y: 0 };
var _initBall = true;

//Used to (semi) avoid tracking objects 
//other than the ball  (using last position threshold)
function posInThreshold(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) < BALL_DIST_THRESHOLD &&
        Math.abs(y1 - y2) < BALL_DIST_THRESHOLD;
}

function reportBallPosition(pos) {
    document.getElementById('ball-pos').innerHTML = pos.x + ' , ' + pos.y;
}

function trackBall(event, canvas, context) {
    event.data.forEach(function (rect) {
        context.strokeStyle = '#FF0000';//Set Style

        //cur_pos might not be the ball's position
        cur_pos.x = rect.x + rect.width / 2;
        cur_pos.y = rect.y + rect.height / 2;

        if (_initBall) {
            _initBall = false;

            //Hope it is the ball X_X
            last_ball_pos.x = cur_pos.x;
            last_ball_pos.y = cur_pos.y;
        }
        else {
            //if within threshold            
            if (posInThreshold(cur_pos.x, last_ball_pos.x, cur_pos.y, last_ball_pos.y)) {
                //Save Position and Draw
                context.beginPath();

                context.moveTo(last_ball_pos.x, last_ball_pos.y);
                context.lineTo(cur_pos.x, cur_pos.y);

                context.stroke();

                last_ball_pos.x = cur_pos.x;
                last_ball_pos.y = cur_pos.y;

                //Report the ball position to whatever
                reportBallPosition(last_ball_pos);
            } else {
                //For now, don't do anything 
                //We say it is not the ball...
            }
        }

        //consider report the last position always - not just on update?
        //reportBallPosition(last_ball_pos);
    });
}



// //Gets called once.
// function trackBall() {
    // var canvas = document.getElementById('canvas');
    // var context = canvas.getContext('2d');
    // var last_x, last_y, x, y = 0;
    // var begin = true;

    // if (STATE == 'init') {

    // } else {

    // }
    // var tracker = new tracking.ColorTracker('yellow');
    // tracking.track('#video', tracker, { camera: true });

    // tracker.on('track', function (event) {
    //     if (STATE == 'init') {
    //         //clear canvas
    //         context.clearRect(0, 0, canvas.width, canvas.height);

    //         //Handle tracked objects
    //         resultCount = event.data.length;
    //         var validCount = 0;
    //         event.data.forEach(function (rect) {
    //             //Check if rect is valid function

    //             //At this point it is valid
    //             validCount++;

    //             //Draw it.
    //             context.strokeStyle = '#FF0000';
    //             context.strokeRect(rect.x, rect.y, rect.width, rect.height);

    //             if (validCount == CONE_COUNT) {
    //                 console.log("We identified all the cones");
    //                 changeState("changeState");
    //             } else if (validCount < CONE_COUNT) {
    //                 console.log("We need more cones");
    //             } else {
    //                 console.log("We identified too many cones");
    //             }
    //         });

    //     } else {
    //         //Track Ball
    //         console.log('Looking for Balls');
    //         event.data.forEach(function (rect) {
    //             context.strokeStyle = '#FF0000';
    //             if (begin) {
    //                 begin = false;
    //                 x = rect.x + rect.width / 2;
    //                 y = rect.y + rect.height / 2;
    //             }
    //             else {
    //                 last_x = x;
    //                 last_y = y;

    //                 x = rect.x + rect.width / 2;
    //                 y = rect.y + rect.height / 2;

    //                 if (Math.abs(last_x - x) < 40 && Math.abs(last_y - y) < 40) {
    //                     context.beginPath();
    //                     context.moveTo(last_x, last_y);
    //                     context.lineTo(x, y);
    //                     context.stroke();
    //                 }
    //                 else {
    //                     x = last_x;
    //                     y = last_y;
    //                 }
    //             }
    //         });
    //     }
    // });

// }