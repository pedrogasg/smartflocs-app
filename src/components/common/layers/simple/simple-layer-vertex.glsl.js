export default `\
#define SHADER_NAME simple-layer-vertex-shader
attribute vec3 positions;
attribute float instanceId;
attribute float instanceCount;
attribute vec3 instancePositions;
attribute vec3 instancePositions64Low;
attribute float instanceRadius;
attribute vec4 instanceFillColors;
attribute vec4 instanceLineColors;
attribute vec3 instancePickingColors;
varying vec4 vFillColor;
varying vec2 unitPosition;
void main(void) {

  picking_setPickingColor(instancePickingColors);
  float down = floor(sqrt(instanceCount));
  float across = floor(instanceCount/down);
  float x = mod(instanceId, across);
  float y = floor(instanceId / across);
  float u = x / (across -  1.);
  float v = y / (across -  1.);
  float ux = u * 2. - 1.;
  float vy = v * 2. - 1.;
  vec3 instancePositionsx = vec3(ux,vy,0.0);
  geometry.worldPosition = instancePositionsx;

  unitPosition = positions.xy;
  geometry.uv = unitPosition;
  geometry.pickingColor = instancePickingColors;
  
 
 
  vec3 offset = positions * project_pixel_size(project_size_to_pixel(instanceRadius));
  DECKGL_FILTER_SIZE(offset, geometry);


  gl_Position = project_position_to_clipspace(instancePositionsx, instancePositions64Low, offset, geometry.position);
  DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
  
  
  
  // Apply opacity to instance color, or return instance picking color
  vFillColor = instanceFillColors;
  DECKGL_FILTER_COLOR(vFillColor, geometry);

  gl_PointSize = instanceRadius * 10.0;
}
`;