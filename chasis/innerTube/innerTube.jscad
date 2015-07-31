var a = 59.7; // width of base
var b = 6.2;  // height of base
var c = 37; // height of inner
var d = 33/2; // outer radius of inner
var e = d - b;    // inner radius (wall width)
var f = a/2 - 5; // screw location

function base(){
    return union([
        cube({
            size: [a,a,b], 
            center: [true, true, false]
        }),
        CSG.cylinder({
          start: [0, 0, 0],
          end: [0, 0, c],
          radius: d,
          resolution: 128
        })
   ]); 
}

function cutout(){
    return CSG.cylinder({
          start: [0, 0, 0],
          end: [0, 0, c],
          radius: e,
          resolution: 128
        })
}

function screwPlus(){
    var radius = 2.75/2;
    return union([
        cylinder({h:10, r1:radius, r2:radius}),
        cube({
            size: [5,5,15], 
            center: [true, true, false]
        }).rotateZ(45).translate([5,5,0])
    ]);
}

function main() {
   return difference([
       base(),
       cutout(),
       screwPlus().rotateZ(0).translate([f,f,0]),
       screwPlus().rotateZ(90).translate([-1*f,f,0]),
       screwPlus().rotateZ(180).translate([-1*f,-1*f,0]),
       screwPlus().rotateZ(270).translate([f,-1*f,0]),
   ]);
}