// title      : OpenJSCAD.org Logo
// author     : Rene K. Mueller
// license    : MIT License
// revision   : 0.003
// tags       : Logo,Intersection,Sphere,Cube
// file       : logo.jscad

var a = 39.8; // width of base
var b = 6.2;  // height of base
var c = 20; // cuts corner off base

var d = 10.23; // screw location outer
var e = a - 4.46; //

var f = a/2 - 5; // screw location

var screw = function(){
    var radius = 2.75/2;
    return cylinder({h:7, r1:radius, r2:radius}).setColor([1,0,0.5]);
};

function base(){
    return difference([
        cube({
            size: [a,a,b ],
            center: [true,true,false]
        }),
        cube({
            size: [a,a,b ],
            center: [true,true,false]
        }).rotateZ(45)
        .translate([c,c,0])
    ]).translate([c,c,0]);
}

function tower(){
    var _o = 9.59;
    var _x = 7.24;
    var _y = 17.42;
    return union([
        cube({
            size: [_x, _o, _y],
            center: [true,true,false]
        }).translate([
            -1*_x/2+0.1,
            _o/2+0.1,
            0
        ]),
        cube({
            size: [_o, _x, _y],
            center: [true,true,false]
        }).translate([
            _o/2+0.1,
            -1*_x/2+0.1,
            0
        ])
    ]);
}


function main() {
   return union([
      difference([
          base(),
          screw().translate([3.86,3.86,0]),
          screw().translate([d,e,0]),
          screw().translate([e,d,0])
      ]),
      tower()
   ]);
}
