

import './App.css';
import {OrthographicView} from '@deck.gl/core';
import {LineLayer} from '@deck.gl/layers';
import React, {Component} from 'react';
import DeckGL from '@deck.gl/react';
import {OrbitView} from '@deck.gl/core';
import {scaleLinear} from 'd3-scale';
import XYAxesLayer from './components/common/layers/axes/x-y-axes-layer'


const EQUATION = (x, y) => (Math.sin(x * x + y * y) * x) / Math.PI;
const DEFAULT_TICK_FORMAT = {type: 'function', value: x => x.toFixed(2)};
const DEFAULT_TICK_COUNT = 1;


const INITIAL_VIEW_STATE = {
  target: [0.5, 0.5, 0.5],
  orbitAxis: 'Z',
  rotationX: 30,
  rotationOrbit: -30,
  /* global window */
  zoom: Math.log2(window.innerHeight / 2) // fit 3x3x3 box in current viewport
};

function getScale({min, max}) {
  return scaleLinear()
    .domain([min, max])
    .range([0, 1]);
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hoverInfo: null
    };

    this._onHover = this._onHover.bind(this);
    this._renderTooltip = this._renderTooltip.bind(this);
  }

  _onHover(info) {
    const hoverInfo = info.sample ? info : null;
    if (hoverInfo !== this.state.hoverInfo) {
      this.setState({hoverInfo});
    }
  }

  _renderTooltip() {
    const {hoverInfo} = this.state;
    return (
      hoverInfo && (
        <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
          {hoverInfo.sample.map(x => x.toFixed(3)).join(', ')}
        </div>
      )
    );
  }

  render() {
    const {resolution = 200, showAxis = true, equation = EQUATION} = this.props;
    let xMin = 10;
    let xMax = -10;
    let yMin = 10;
    let yMax = -10;
    let zMin = 10;
    let zMax = -10;
    const layers = [
      equation &&
        resolution &&
        new XYAxesLayer({
          xTicks: DEFAULT_TICK_COUNT,
          yTicks: DEFAULT_TICK_COUNT,
          zTicks: 0,
          xScale : getScale({min: xMin, max: xMax}),
          yScale : getScale({min: yMin, max: yMax}),
          zScale : getScale({min: zMin, max: zMax}),
          xTitle: 'x',
          yTitle: 'y',
          zTitle: 'z',
          drawAxes: true,
          fontSize: 12,
          xTickFormat: DEFAULT_TICK_FORMAT.value,
          yTickFormat: DEFAULT_TICK_FORMAT.value,
          zTickFormat: DEFAULT_TICK_FORMAT.value,
        })
    ];

    return (
      <DeckGL
        layers={layers}
        views={new OrbitView()}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        {this._renderTooltip}
      </DeckGL>
    );
  }
}

