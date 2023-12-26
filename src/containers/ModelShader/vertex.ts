import locations from './locations'

export default `
precision mediump float;
attribute vec3 ${locations.POSITION};
varying vec3 color;
attribute vec3 ${locations.NORMAL};
varying vec3 surfaceNormal;
varying vec3 lightVector;
varying vec3 pass_lightColor;
varying float pass_lightAmbient;
uniform mat4 ${locations.TRANSFORM};
uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform float lightAmbient;

void main(void) {
  color = ${locations.POSITION};
  gl_Position = ${locations.TRANSFORM} * vec4(${locations.POSITION}, 1.0);
  vec4 worldPos = ${locations.TRANSFORM} * vec4(${locations.POSITION}, 1.0);
  surfaceNormal = (${locations.TRANSFORM} * vec4(${locations.NORMAL}, 0.0)).xyz;
  lightVector = lightPosition - worldPos.xyz;
  gl_Position = worldPos;
  pass_lightColor = lightColor;
  pass_lightAmbient = lightAmbient;
}
`
