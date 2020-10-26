export default `\
#define SHADER_NAME plotter-layer-fragment-shader
precision highp float;
uniform bool filled;
uniform float stroked;
varying vec4 vFillColor;
varying vec4 vLineColor;
varying vec2 unitPosition;
varying float innerUnitRadius;
varying float outerRadiusPixels;
void main(void) {
  geometry.uv = unitPosition;
  float distToCenter = length(unitPosition) * outerRadiusPixels;
  float inCircle = smoothedge(distToCenter, outerRadiusPixels);
  if (inCircle == 0.0) {
    discard;
  }
  if (stroked > 0.5) {
    float isLine = smoothedge(innerUnitRadius * outerRadiusPixels, distToCenter);
    if (filled) {
       gl_FragColor = mix(vFillColor, vLineColor, isLine);
      //gl_FragColor = vec4(vec3(0.5), vLineColor.a * isLine);
    } else {
      if (isLine == 0.0) {
        discard;
      }
      gl_FragColor = vec4(vLineColor.rgb, vLineColor.a * isLine);
      //gl_FragColor = vec4(vec3(0.5), vLineColor.a * isLine);
    }
  } else if (filled) {
    gl_FragColor = vFillColor;
    //vec3 color = vFillColor.rgb - unitPosition.x;
    //color *= vFillColor.rgb - unitPosition.y;
    //gl_FragColor = vec4(color, vFillColor.a);
  } else {
    discard;
  }
  gl_FragColor.a *= inCircle;
  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
}
`;