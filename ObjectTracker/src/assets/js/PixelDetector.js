class PixelDetector {

    constructor() {
        console.log("New pixel detector constructed...");

        this.CONE_COUNT = 3; //aka City Count
        this.STATE = "track_ball"; //track_cones or track_ball
        //e.g = [  rect , rect , rect , rect ]
        this.identified_cones = []//The final array of cones

        //ONLY VALIDATED BALL POSITION
        this.last_ball_pos = { x: 0, y: 0 }

        this.BALL_DIST_THRESHOLD = 100;
        this.canvas = null;
        this.context = null;

        //Dont use cur_pos as ball position...
        this.cur_pos = { x: 0, y: 0 };
        this._initBall = true;

        this.useMouseBypass = false;
    }

    setConeCount(count) {
        this.CONE_COUNT = count;
    }

    startCitySelection() {
        console.log("Click on the " + this.CONE_COUNT + " cities");
        this.canvas.addEventListener('mousedown', (e) => {
            if (this.STATE == "track_cones") {
                var pos = getCursorPosition(canvas, e);

                //add this to the city
                this.identified_cones.push({
                    x: pos.x,
                    y: pos.y,
                    id: this.identified_cones.length
                });
                console.log(this.identified_cones)

                if (this.identified_cones.length == this.CONE_COUNT) {
                    this.endCitySelection();
                }
            }
        });
    }

    endCitySelection() {
        console.log("We identified all the cities at:");
        console.log(this.identified_cones);
        this.changeState('track_ball');
    }

    startMouseBypass() {
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.STATE == "track_ball") {
                var pos = getCursorPosition(canvas, e);
                this.last_ball_pos.x = pos.x;
                this.last_ball_pos.y = pos.y;
                // console.log(this.last_ball_pos);
            }
        });
    }


    foo() {
        console.log("hello world!");
    }

    //Start Tracking - Entry Point
    //1. Find Cones (pixel positions stored in ...)
    //2. Start tracking ball. Report position
    start() {
        console.log('start');

        this.canvas = document.getElementById('canvas');
        this.context = canvas.getContext('2d');
        this.context.lineWidth = 7;
        this.context.strokeStyle = '#FF0000';//Set Style


        //Setup Ball Identifying Color
        tracking.ColorTracker.registerColor('ball_color', function (r, g, b) {
            return (r > 200 && g > 200 && b > 180);//true/false
        });

        //Setup Cone Identifying Color
        // tracking.ColorTracker.registerColor('cone_color', function (r, g, b) {
        //     return (r > 200 && g < 80 && b < 80);//true/false
        // });

        var tracker = new tracking.ColorTracker('ball_color');
        tracking.track('#video', tracker);
        tracker.on('track', (event) => {
            if (this.STATE == "track_cones") {
                //Not using this anymore x_x
                //this.trackCones(event, this.canvas, this.context);
            } else if (this.STATE == "track_ball") {
                if (!this.useMouseBypass) {
                    this.trackBall(event, this.canvas, this.context);
                }
            }
        });

        this.startCitySelection();
        if (this.useMouseBypass) {
            this.startMouseBypass();
        }
    }


    changeState(new_state) {
        // console.log('changeState');
        if (new_state != undefined) {
            this.STATE = new_state; //just reset
        } else {
            this.STATE = (this.STATE == 'track_ball') ? 'track_cones' : 'track_ball';
        }
        // document.getElementById("current-tracking-btn").innerHTML = this.STATE;
        console.log(this.STATE);
    }

    //Used to (semi) avoid tracking objects
    //other than the ball  (using last position threshold)
    posInThreshold(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) < this.BALL_DIST_THRESHOLD &&
            Math.abs(y1 - y2) < this.BALL_DIST_THRESHOLD;
    }

    reportBallPosition(pos) {
        //document.getElementById('ball-pos').innerHTML = pos.x + ' , ' + pos.y;
        // console.log(pos.x + ' , ' + pos.y);
    }

    trackBall(event, canvas, context) {
        event.data.forEach((rect) => {
            if (rect.color != 'ball_color')
                return;


            //cur_pos might not be the ball's position
            this.cur_pos.x = rect.x + rect.width / 2;
            this.cur_pos.y = rect.y + rect.height / 2;

            if (this._initBall) {
                this._initBall = false;

                //Hope it is the ball X_X
                this.last_ball_pos.x = this.cur_pos.x;
                this.last_ball_pos.y = this.cur_pos.y;
            }
            else {
                //if within threshold
                if (this.posInThreshold(this.cur_pos.x, this.last_ball_pos.x, this.cur_pos.y, this.last_ball_pos.y)) {
                    //Save Position and Draw
                    context.beginPath();

                    context.moveTo(this.last_ball_pos.x, this.last_ball_pos.y);
                    context.lineTo(this.cur_pos.x, this.cur_pos.y);

                    context.stroke();

                    this.last_ball_pos.x = this.cur_pos.x;
                    this.last_ball_pos.y = this.cur_pos.y;

                    //Report the ball position to whatever
                    this.reportBallPosition(this.last_ball_pos);
                } else {
                    //For now, don't do anything
                    //We say it is not the ball...
                }
            }
            //consider report the last position always - not just on update?
            //reportBallPosition(last_ball_pos);
        });
    }

    trackCones(event, canvas, context) {
        return;
        // console.log('trackCones');
        //clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        //Handle tracked objects
        // resultCount = event.data.length;
        var validCount = 0;
        this.identified_cones = [];
        event.data.forEach((rect) => {
            if (rect.color != 'cone_color')
                return;
            //Check if rect is valid function
            //<<< INSERT VALIDATE FUNCTION HERE >>>>//

            //At this point it is valid
            validCount++;

            //Save the entire rect in identified_cones
            // TODO: Save cones?
            this.identified_cones.push(rect);

            //Draw it.
            context.strokeStyle = '#FF0000';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);

            if (validCount == this.CONE_COUNT) {
                console.log("We identified all the cones");
                this.changeState();
                // this.identifyCones();
                context.clearRect(0, 0, canvas.width, canvas.height);
            } else if (validCount < this.CONE_COUNT) {
                console.log("We need more cones");
            } else {
                console.log("We identified too many cones");
                // this.changeState('track_cones');
            }
        });
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return { x: x, y: y };
}