// title      : OpenJSCAD.org Logo
// author     : Rene K. Mueller
// license    : MIT License
// revision   : 0.003
// tags       : Logo,Intersection,Sphere,Cube
// file       : logo.jscad

const OUTER_RADIUS = 41.93/2;
const INNER_RADIUS = 35.65/2;
const HEIGHT = 18.37;

function main() {
   return difference(
         cylinder({r: OUTER_RADIUS, h: HEIGHT, fn: 80}),
         cylinder({r: INNER_RADIUS, h: HEIGHT, fn: 80})
   ).translate([0,0,0]).scale(1);
}
