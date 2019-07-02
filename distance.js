function difference (n1, n2) 
{
  if (n1 > n2)
 {
    return (n1 - n2);
  }
   else
  {
    return (n2 - n1);
  }
};

function distance (x1, y1, x2, y2) 
{
  var deltaX = difference(x1, x2);
  var deltaY = difference(y1, y2);
  var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return (dist.toFixed(2));
};
// here you use the objects x and y method (boject.x anf object.y)
function angle(bollx, bolly, conex, coney)
 {
    var dircy = bolly - coney;
    var dircx = bollx - conex;
  
    var value = Math.atan2(dircy, dircx); 
    value *= 180 / Math.PI;

    while(value < 0) 
    { 
      value += 360.0;
    };

    while(value > 360)
    {
      value -= 360;
    };

    if(bollx > conex && bolly > coney )//|| - bollx > -conex ) //&& -boll)
    {
      value += 180;
    }

    else if(- bollx > - coney)
    {
      value -= 180;
    }

    var dirct;

    if(value == 0)
    {
      dirct = " North";
    }

    else if(value > 0 && value < 90)
    {
      dirct = " North,East";
    }

    else if(value == 90)
    {
      dirct = " East";
    }

    else if(value > 90 && value < 180)
    {
      dirct = " South ,East";
    }

    else if(value == 180)
    {
      dirct = "South";
    }

    else if(value > 180 && value < 270)
    {
      dirct = " South, West";
    }

    else if(value == 270)
    {
      dirct = " South";
    }

    else if(value > 270 && value < 360)
    {
      dirct = " North, West";
    }
    
    return value.toFixed(2) + dirct ;
  };

  // loop that constantly shows the distance and angel
  do
  {
    var bollx = 2;
    var bolly = 1;
    var cityx = 4;
    var cityY = 3;

    
    console.log("move: "+angle(bollx,bolly,cityx,cityY));
    console.log("distance:"+distance(bollx,bolly,cityx,cityY));
    
    

  }while(distance(bollx,bolly,cityx,cityY) > 1);
  console.log("you have reached the end please upload the the next cordinates ");

 
