export default `\
#define SHADER_NAME graph-layer-fragment-shader
precision highp float;
uniform sampler2D labelTexture;
varying vec2 vTexCoords;
varying float shouldDiscard;
void main(void) {
  if (shouldDiscard > 0.0) {
    discard;
  }
  vec4 color = texture2D(labelTexture, vTexCoords);
  if (color.a == 0.0) {
    discard;
  }
  gl_FragColor = color;
}
`;