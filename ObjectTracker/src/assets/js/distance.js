class Distance {
  static difference(n1, n2) {
    if (n1 > n2) {
      return n1 - n2;
    } else {
      return n2 - n1;
    }
  }

  static distance(x1, y1, x2, y2) {
    var deltaX = this.difference(x1, x2);
    var deltaY = this.difference(y1, y2);
    var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return dist.toFixed(2);
  }
  // here you use the objects x and y method (object.x anf object.y)
  static angle(ballx, bally, conex, coney) {
    var dircy = bally - coney;
    var dircx = ballx - conex;

    var value = Math.atan2(dircy, dircx);
    value *= 180 / Math.PI;

      if(ballx > conex || bally > coney )
    {
      value += 180;
    }
   /* if(ballx > conex && bally > coney)
    {
      value += 180;
    }*/
    if(ballx == conex || bally == coney )
    {
      value -= 90;
    }
    /*if(ballx == conex && bally == coney)
    {
      value -= 90;
    }*/

    if(ballx == bally || conex == coney )
    {
      value += 180;
    }
    if(ballx == bally && conex == coney)
    {
      value += 180;
    }

    if(ballx == coney || bally == conex)
    {
      value -= 180;
    }

    if(ballx < conex ||bally < coney )
    {
      value -= 180;
    }
    /* if(ballx < conex && bally < coney)
    {
      value -= 180;
    }*/

    if(ballx == coney || conex == bally )
    {
      value += 180;
    }

    while(value < 0) 
    { 
      value += 360.0;
    };

    while(value > 360)
    {
      value -= 360;
    };

    var dirct;

    if (value == 0) {
      dirct = " North";
    } else if (value > 0 && value < 90) {
      dirct = " North,East";
    } else if (value == 90) {
      dirct = " East";
    } else if (value > 90 && value < 180) {
      dirct = " South ,East";
    } else if (value == 180) {
      dirct = "South";
    } else if (value > 180 && value < 270) {
      dirct = " South, West";
    } else if (value == 270) {
      dirct = " West";
    } else if (value > 270 && value < 360) {
      dirct = " North, West";
    }

    return value.toFixed(2) + dirct;
  }

  // loop that constantly shows the distance and angel

  /*
  // the following code is for if you want to add the coordinates of the cone physically first.s
  var cone = [3,4,5,2,6,7];
  var n = 0;

  do
  {
    var ballx = -2000;
    var bally = -2200;
    var cityx = cone[n];
    var cityY = cone[n+1];

    console.log("move: "+angle(ballx,bally,cityx,cityY));
    console.log("distance:"+distance(ballx,bally,cityx,cityY)+"km");
    if(distance(ballx,bally,cityx,cityY) < 1)
    {
      console.log("you have reached your destination");
      console.log("Here is your next location: ");
      n++;

    }

  }while(n < loca.length);
  console.log("you have reached the finial location");

  */

  // do
  // {
  //   var ballx = 2;
  //   var bally = 3;
  //   var cityx = 4;
  //   var cityY = -4;

  //   console.log("move: "+angle(ballx,bally,cityx,cityY));
  //   console.log("distance:"+distance(ballx,bally,cityx,cityY)+"km");

  // }while(distance(ballx,bally,cityx,cityY) > 1);
  // console.log("you have reached your destination");
}
