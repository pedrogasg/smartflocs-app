export default `\
#define SHADER_NAME graph-layer-axis-vertex-shader
attribute vec3 positions;
attribute vec3 normals;
attribute vec2 instancePositions;
attribute vec3 instanceNormals;
attribute float instanceIsTitle;
uniform vec3 gridDims;
uniform vec3 gridCenter;
uniform float gridOffset;
uniform vec4 strokeColor;
varying vec4 vColor;
varying float shouldDiscard;
// determines if the grid line is behind or in front of the center
float frontFacing(vec3 v) {
  vec4 v_clipspace = project_uViewProjectionMatrix * project_uModelMatrix * vec4(v, 0.0);
  return step(v_clipspace.z, 0.0);
}
void main(void) {
  // rotated rectangle to align with slice:
  // for each x tick, draw rectangle on yz plane
  // for each y tick, draw rectangle on zx plane
  // for each z tick, draw rectangle on xy plane
  // offset of each corner of the rectangle from tick on axis
  vec3 gridVertexOffset = mat3(
      vec3(positions.z, positions.xy),
      vec3(positions.yz, positions.x),
      positions
    ) * instanceNormals;
  // normal of each edge of the rectangle from tick on axis
  vec3 gridLineNormal = mat3(
      vec3(normals.z, normals.xy),
      vec3(normals.yz, normals.x),
      normals
    ) * instanceNormals;
  // do not draw grid line in front of the graph
  shouldDiscard = frontFacing(gridLineNormal) + instanceIsTitle;
  vec3 position_modelspace = vec3(instancePositions.x) *
    instanceNormals + gridVertexOffset * gridDims / 2.0 + gridCenter * abs(gridVertexOffset);
  // apply offsets
  position_modelspace += gridOffset * gridLineNormal;
  vec3 position_commonspace = project_position(position_modelspace);
  gl_Position = project_common_position_to_clipspace(vec4(position_commonspace, 1.0));
  vColor = strokeColor / 255.0;
}
`;