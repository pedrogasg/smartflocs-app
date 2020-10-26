export default `\
#define SHADER_NAME graph-layer-fragment-shader
precision highp float;
varying vec4 vColor;
varying float shouldDiscard;
void main(void) {
  if (shouldDiscard > 0.0) {
    discard;
  }
  gl_FragColor = vColor;
}
`;