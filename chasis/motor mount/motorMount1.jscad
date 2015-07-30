// title: OpenJSCAD.org Logo
// author: Rene K. Mueller 
// license: Creative Commons CC BY
// URL: http://openjscad.org/#examples/logo.jscad
// revision: 0.003
// tags: Logo,Intersection,Sphere,Cube

//hole
var collarDiameter = 36.85;
var mountDepth = 6.65;

//shell
var wallThickSide = 1;
var wallThickBottom = 5;
var shellDepth = 58.7;

var hole = function(){ 
    return union(
       CSG.cylinder({ //collar
          start: [0, 0, 0],
          end: [0, 21.9, 0],
          radius: 36.85/2,
          resolution: 64
        }).setColor(0.5,0.5,0),
        CSG.cylinder({ //body
              start: [0, 0, 0],
              end: [0, 52.4, 0],
              radius: 34.4/2,
              resolution: 64
        }).setColor(0,1,0),
        union( // mount
           CSG.cylinder({
              start: [0, 0, 0],
              end: [0, mountDepth, 0],
              radius: collarDiameter/2,
              resolution: 64
            }).translate([0,-1*mountDepth,0]),
            cube({
                size: [collarDiameter,mountDepth,collarDiameter/2], 
                round: false
            }).translate([collarDiameter/-2,-1*mountDepth,collarDiameter/-2])
              
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
            }),
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
            ])
              
        ).setColor(1,1,1).translate([0,-1*mountDepth,0]);
};

function main() {
   return difference(shell(),hole()).translate([0,0,0]);
}
