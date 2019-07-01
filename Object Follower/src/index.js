import React from "react";
import ReactDOM from "react-dom";

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import "./styles.css";

class App extends React.Component {
  videoRef = React.createRef();
  canvasRef = React.createRef();

  x_history = [];
  y_history = [];
  number_points = 0;

  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        });
      const modelPromise = cocoSsd.load();
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  };

  renderPredictions = predictions => {
    const ctx = this.canvasRef.current.getContext("2d");
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    //ctx.textBaseline = "top";
    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      var x_centre = x+(width/2);
      var y_centre = y+(height/2);
      this.x_history.push(x_centre);
      this.y_history.push(y_centre);
      this.number_points++;

      // // Draw the bounding box.
      ctx.strokeStyle = "#FF0000";
      ctx.lineWidth = 1;
      if (this.number_points >= 2){
        ctx.beginPath();
        ctx.moveTo(this.x_history[this.number_points-2],this.y_history[this.number_points-2]);
        ctx.lineTo(this.x_history[this.number_points-1],this.y_history[this.number_points-1]);
        ctx.stroke();
      }
      else{
        ctx.strokeRect(x_centre-1, y_centre-1, 2, 2);
      }

      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      //const textWidth = ctx.measureText(prediction.class).width;
      //const textHeight = parseInt(font, 10); // base 10
      //ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    // predictions.forEach(prediction => {
    //   //const x = prediction.bbox[0];
    //   //const y = prediction.bbox[1];
    //   // Draw the text last to ensure it's on top.
    //   //ctx.fillStyle = "#000000";
    //   //ctx.fillText(prediction.class, x, y);
    // });
  };

  render() {
    return (
      <div>
        <video
          className="size"
          autoPlay
          playsInline
          muted
          ref={this.videoRef}
          width="600"
          height="500"
        />
        <canvas
          className="size"
          ref={this.canvasRef}
          width="600"
          height="500"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
