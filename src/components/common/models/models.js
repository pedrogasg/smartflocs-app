import GL from '@luma.gl/constants';
import {Model, Geometry} from '@luma.gl/core';
import { ZeroVector } from './positions';


const BaseModel = function(gl, shaders, id, positions, drawMode){
    return  new Model(
        gl,
        Object.assign(shaders, {
          id,
          geometry: new Geometry({
            id,
            drawMode,
            attributes: {
              positions: { size: 3, value: positions}
            }
          }),
          isInstanced: true,
          isIndexed: false
        })
  
      );
};

const PointModel = function(gl, shaders, id){
    return BaseModel(gl, shaders, id, ZeroVector, GL.POINTS);
}

const LineModel = function(gl, shaders, id, positions){
    return BaseModel(gl, shaders, id, new Float32Array(positions), GL.LINES);
}

const TriangleFanModel = function(gl, shaders, id, positions){
    return BaseModel(gl, shaders, id, new Float32Array(positions), GL.TRIANGLE_FAN);
}

export default { PointModel, LineModel, TriangleFanModel };