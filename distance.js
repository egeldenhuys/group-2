function difference (n1, n2) {
  if (n1 > n2) {
    return (n1 - n2);
  }
   else {
    return (n2 - n1);
  }
};

function distance (x1, y1, x2, y2) {
  var deltaX = difference(x1, x2);
  var deltaY = difference(y1, y2);
  var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return (dist);
};

function angle(px, py, p2x, p2y) {
    var dircy = py - p2y;
    var dircx = px - p2x;
    var value = Math.atan2(dircy, dircx); 
    value *= 180 / Math.PI; 

    if(value < 0 && value >-360 ) {
      value +=360;
    }

    else if(value < 0 && value >-270 ){
      value += 270;
    }

    else if(value < 0 && value > -180){
      value += 180;
    }

    else if(value < 0 && value > -90)
    {
      value += 90;
    }
    
    return value;
  };

  //console.log(angle(12,12,10,10));

