
// Here we define the user editable parameters: 
function getParameterDefinitions() {
  return [
    { name: 'numSides', caption: 'Number of sides:', type: 'int', initial: 8 },
    { name: 'size', caption: 'Radius:', type: 'int', initial: 88.945 },
    { name: 'Xcenter', caption: 'X center:', type: 'float', initial: 0.0 },
    { name: 'Ycenter', caption: 'Y center:', type: 'float', initial: 0.0 },
    { name: 'height', caption: 'Height:', type: 'float', initial: 55 },
    { name: 'motorWidth', caption: 'Motor Width:', type: 'float', initial: 37.64 },
    { name: 'motorDepth', caption: 'Motor Depth:', type: 'float', initial: 57.94 }
  ];
}

var polygonPlate = function(x){
    var points = [];
    for (var i = 0; i < x.numSides;i += 1) {
        points.push([
            x.Xcenter + x.size * Math.cos(i * 2 * Math.PI / x.numSides), 
            x.Ycenter + x.size * Math.sin(i * 2 * Math.PI / x.numSides)
        ]);
    }
    return new CSG.Polygon2D(points)
            .extrude({offset: [0, 0, x.height]})
            .rotateZ(45/2);
};

var onlyShowAFourth = function(height){ 
    return union([
        cube([100,100,height]).rotateZ(90),
        cube([100,100,height]).rotateZ(180),
        cube([100,100,height])
    ]);
};



var addTab = function(height){
    return cube([20,10,height]).translate([30,0,0]);
};


var removeMotors = function(){
    var motor = cube({
            size:[motorWidth,motorDepth,22],
            center:true
        }).translate([0,(motorDepth/2)+27.38,0]);
    return union([
        motor,
        motor.rotateZ(90),
        motor.rotateZ(180),
        motor.rotateZ(270)
    ]);
};

var subtractTab = function(){
    return cube([height+0.04,20.04,10]).translate([motorWidth/2,-47.42,0]);
};

var subtractTabR = function(){
    return cube([height+0.04,20.04,10]).setColor([0,1,0]).rotateZ(90).translate([47.42,-1*motorWidth/2-height,0]);
};

var cutoutCenter = function(){
    var cubeWidth = 40;
    return cube({size:[cubeWidth,cubeWidth,cubeWidth],center:true}).rotateZ(0);

};

var removeWedge = function(length){
    return difference([
        cube([height,length,height]),
        cube([height,length,height]).scale(3).rotateY(45)
    ]).setColor(1,0,0);
};

var screw = function(){
    var radius = 2.75/2;
    return cylinder({h:7, r1:radius, r2:radius}).setColor([1,0,0.5]);
};

var screws = function(){
    var d1 = 4;
    var d2 = 27.375; //screw centered on right top edge
    var d3 = d2-d1;
    var d4 = 2*d2-d1;
    var d5 = 3*d2+0.5-1.375; //screw centered on bottom edge
    var d6 = d5 - d1;
    var d7 = d4+((d6-d4)/2);
    var d8 = d4+((d7-d4)/2)-d1/1.4142135; //sqrt(2)
    var d9 = d2+d1+0.8;
            
    return union([
        screw().translate([d1,-1*d1,0]),
        screw().translate([d3,-1*d1,0]),
        screw().translate([d1,-1*d3,0]),
        screw().translate([d3,-1*d3,0]),
        screw().translate([d2,-1*d4,0]), //
        screw().translate([d2,-1*d7,0]),
        screw().translate([d2,-1*d6,0]),
        screw().translate([d4,-1*d2,0]), //
        screw().translate([d7,-1*d2,0]),
        screw().translate([d6,-1*d2,0]),
        screw().translate([d8,-1*d8,0]) // center diag edge
    ]);
}

function wallmount(height){
       var radius = 7.2/2;
       var radius2 = 4.15/2;
       var d1 = 10;
       var outer = cylinder({h:height, r1:radius, r2:radius})
            .setColor([1,1,0.5]);
        var inner = cylinder({h:height, r1:radius2, r2:radius2})
            .setColor([1,1,0.5]);
            
        return difference(outer,inner);
}

var motorWidth = 0;
var motorDepth = 0;
var height = 0;
function main(params) {
   motorWidth = params.motorWidth;
   motorDepth = params.motorDepth;
   height = params.height;
   var boo = {
       size: params.size, 
       Xcenter: params.Xcenter,
       Ycenter: params.Ycenter,
       numSides: params.numSides,
       height: params.height
   };
   var koo = {
       size: params.size-7, 
       Xcenter: params.Xcenter,
       Ycenter: params.Ycenter,
       numSides: params.numSides,
       height: params.height
   };
   var b = difference([
    polygonPlate(boo),
    polygonPlate(koo),
    //onlyShowAFourth(),
    onlyShowAFourth(params.height).rotateZ(45),
    //removeMotors(),
    //subtractTab(),
    //subtractTabR(),
    //removeWedge(40).translate([motorWidth/2,-85,0]),
    //removeWedge(58)
    //        .rotateY(90).translate([0,0,height])
    //        .rotateZ(90).translate([85.38,-1*motorWidth/2-height,0]),
    //cutoutCenter(),
    //screws()
   ]);
   
   
   
   return union([
       b,
       wallmount(params.height).translate([54,-49,0]),
       wallmount(params.height).translate([54,49,0]),
       //removeWedge(58).translate([motorWidth/2,-85,0]),
       //removeWedge(58)
       //    .rotateY(90).translate([0,0,height])
       //    .rotateZ(90).translate([85,-1*motorWidth/2-height,0]),
       //addTab(boo.height)
       //subtractTabR()
       //screws(),
       //screws().rotateZ(90),
       //screws().rotateZ(180),
       //screws().rotateZ(270),
   ]).scale([1.085,1.085,1]);
}
