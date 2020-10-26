import {Layer, project32, picking} from '@deck.gl/core';
import {DOUBLE, UNSIGNED_BYTE} from '@luma.gl/constants';

import vs from './simple-layer-vertex.glsl';
import fs from './simple-layer-fragment.glsl';
import Models from '../../models/models';

const DEFAULT_COLOR = [0, 0, 0, 255];

const defaultProps = {
  getPosition: {type: 'accessor', value: x => x.position},
  getRadius: {type: 'accessor', value: 1},
  getFillColor: {type: 'accessor', value: DEFAULT_COLOR},
};

export default class SimpleLayer extends Layer {
  getShaders(id) {
    return super.getShaders({vs, fs, modules: [project32, picking]});
  }
  initializeState() {
    this.getAttributeManager().addInstanced({
      instancePositions: {
        size: 3,
        type: DOUBLE,
        fp64: this.use64bitPositions(),
        transition: true,
        accessor: 'getPosition'
      },
      instanceId: {
        size: 1,
        transition: true,
        accessor: 'getId',
        defaultValue: 0
      },
      instanceCount: {
          size: 1,
          transition: true,
          accessor: 'getCount',
          defaultValue: 0
      },
      instanceRadius: {
        size: 1,
        transition: true,
        accessor: 'getRadius',
        defaultValue: 1
      },
      instanceFillColors: {
        size: this.props.colorFormat.length,
        transition: true,
        normalized: true,
        type: UNSIGNED_BYTE,
        accessor: 'getFillColor',
        defaultValue: DEFAULT_COLOR
      },
    });
  }

  updateState({props, oldProps, changeFlags}) {
    super.updateState({props, oldProps, changeFlags});
    if (changeFlags.extensionsChanged) {
      const {gl} = this.context;
      if (this.state.model) {
        this.state.model.delete();
      }
      this.setState({model: this._getModel(gl)});
      this.getAttributeManager().invalidateAll();
    }
  }

  draw({uniforms}) {
    this.state.model
      .setUniforms(uniforms)
      .draw();
  }

  _getModel(gl) {
    // a square that minimally cover the unit circle
    const positions = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0,];

    const gridPositions = [
      // left edge
      -1,
      -1,
      0,
      -1,
      1,
      0,
      // top edge
      -1,
      1,
      0,
      1,
      1,
      0,
      // right edge
      1,
      1,
      0,
      1,
      -1,
      0,
      // bottom edge
      1,
      -1,
      0,
      -1,
      -1,
      0
    ];
    // normal of each edge


    return Models.PointModel(gl, this.getShaders(), this.props.id);

    //return Models.LineModel(gl, this.getShaders(), this.props.id, gridPositions);

    //return Models.TriangleFanModel(gl, this.getShaders(), this.props.id, positions);

  }
}

SimpleLayer.layerName = 'SimpleLayer';
SimpleLayer.defaultProps = defaultProps;
