// title: OpenJSCAD.org Logo
// author: Rene K. Mueller 
// license: Creative Commons CC BY
// URL: http://openjscad.org/#examples/logo.jscad
// revision: 0.003
// tags: Logo,Intersection,Sphere,Cube

var mainOffset = 0.5;
var bodyOffset = mainOffset+0.2;

//hole
var collarDiameter = 36.85+bodyOffset;
var collarDepth = 21.9;
var mountDepth = 6.65;
var mountDiameter = 36.85+mainOffset;
var bodyDepth = 52.4;
var bodyDiameter = 34.4+bodyOffset;

//shell
var wallThickSide = 1.5;
var wallThickBottom = 3;
var shellDepth = 58.7;

var baseDim = {size:[
        1.95+collarDiameter+wallThickSide*2,
        bodyDepth+mountDepth-2*mainOffset+bodyOffset-0.05,
        6
    ], center: [true,false,false]};
var basePos = [
    0,
    0,
    -1*mountDiameter/2-1*wallThickBottom-1.600
];
var baseBlockDim = {size:[
        1.95+collarDiameter+wallThickSide*2+12,
        21.3,
        6
    ], center: [true,false,false]};
var baseBlockPos = [
    0,
    baseDim.size[1]-21.3,
    -1*mountDiameter/2-1*wallThickBottom-1.600
];
var base = function(){

    return cube(baseDim).setColor([1,0,1]).translate(basePos);
};

var baseBlock = function(){

    return cube(baseBlockDim).setColor([1,0,1]).translate(baseBlockPos);
};

var height = 6;
var removeWedge = function(length){
    return difference([
        cube([height,length,height]),
        cube([height,length,height]).scale(3).rotateY(45)
    ]).setColor(1,0,0);
};
var hole = function(){ 
    return union(
       CSG.cylinder({ //collar
          start: [0, 0, 0],
          end: [0, collarDepth, 0],
          radius: collarDiameter/2,
          resolution: 64
        }).setColor(0.5,0.5,0),
        CSG.cylinder({ //body
              start: [0, 0, 0],
              end: [0, bodyDepth, 0],
              radius: bodyDiameter/2,
              resolution: 64
        }).setColor(0,1,0),
        union( // mount
           CSG.cylinder({
              start: [0, 0, 0],
              end: [0, mountDepth, 0],
              radius: mountDiameter/2,
              resolution: 64
            }).translate([0,-1*mountDepth,0]),
            cube({
                size: [mountDiameter,mountDepth,mountDiameter/2], 
                round: false
            }).translate([mountDiameter/-2,-1*mountDepth,mountDiameter/-2])
              
        ).setColor(1,0,0)
    ).translate([0,0,0]).scale(1);
};

var shell = function(){

    return union( // shell
           CSG.cylinder({
              start: [0, 0, 0],
              end: [0, shellDepth, 0],
              radius: (collarDiameter/2)+wallThickSide,
              resolution: 64
            }).setColor(1,1,1),
            cube({
                size: [
                    collarDiameter+(2*wallThickSide),
                    shellDepth,
                    (collarDiameter/2)+wallThickBottom
                ], 
                round: false
            }).translate([
                (collarDiameter/-2)-wallThickSide,
                0,
                (collarDiameter/-2)-wallThickSide-wallThickBottom
            ]).setColor(0,1,1),
            base(),
            removeWedge(37.15+2).rotateY(180).translate([
                -1*((collarDiameter/2)+wallThickSide)-1.95/2,
                0,
                basePos[2]+6
            ]),
            removeWedge(37.15+2).rotateY(270).translate([
                (1.95/2)+6+((collarDiameter/2)+wallThickSide),
                0,
                basePos[2]
            ]),
            baseBlock()
              
        ).translate([0,-1*mountDepth,0]);
};

function main() {
   return difference(shell(),hole()).translate([0,0,0]);
}
