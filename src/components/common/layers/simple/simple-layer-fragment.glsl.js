export default `\
#define SHADER_NAME simple-layer-fragment-shader
precision highp float;
varying vec4 vFillColor;
varying vec2 unitPosition;
void main(void) {
  geometry.uv = unitPosition;

  gl_FragColor = vFillColor;

  gl_FragColor.a *= 1.0;;
  DECKGL_FILTER_COLOR(gl_FragColor, geometry);
  gl_FragColor = picking_filterPickingColor(gl_FragColor);
}
`;