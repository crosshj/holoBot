
// Here we define the user editable parameters: 
function getParameterDefinitions() {
  return [
    { name: 'numSides', caption: 'Number of sides:', type: 'int', initial: 8 },
    { name: 'size', caption: 'Radius:', type: 'int', initial: 88.945 },
    { name: 'Xcenter', caption: 'X center:', type: 'float', initial: 0.0 },
    { name: 'Ycenter', caption: 'Y center:', type: 'float', initial: 0.0 },
    { name: 'height', caption: 'Height:', type: 'float', initial: 6.3 },
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

var onlyShowAFourth = function(){ 
    return union([
        cube([100,100,10]).rotateZ(90),
        cube([100,100,10]).rotateZ(180),
        cube([100,100,10])
    ]);
};

var subtractTab = function(){
    return cube([10,20,10]).translate([0,-50,0]);
};

var addTab = function(height){
    return cube([20,10,height]).translate([30,0,0]);
};

var motorWidth = 0;
var motorDepth = 0;
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

var cutoutCenter = function(){
    var cubeWidth = 40;
    return cube({size:[cubeWidth,cubeWidth,cubeWidth],center:true}).rotateZ(0);

};

function main(params) {
   motorWidth = params.motorWidth;
   motorDepth = params.motorDepth;
   var boo = {
       size: params.size, 
       Xcenter: params.Xcenter,
       Ycenter: params.Ycenter,
       numSides: params.numSides,
       height: params.height
   };
   var b = difference([
    polygonPlate(boo),
    onlyShowAFourth(),
    //subtractTab(),
    removeMotors(),
    cutoutCenter()
   ]);
   
   return union([
       b,
       //addTab(boo.height)
   ]).scale([1.085,1.085,1]);
}
