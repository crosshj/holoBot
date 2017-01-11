

const OUTER_RADIUS = 41.93/2;
const INNER_RADIUS = 35.65/2;
const HEIGHT = 18.37+2.8;

function main() {
   return difference(
         cylinder({r: OUTER_RADIUS, h: HEIGHT, fn: 80}),
         cylinder({r: INNER_RADIUS, h: HEIGHT, fn: 80})
   ).translate([0,0,0]).scale(1);
}
