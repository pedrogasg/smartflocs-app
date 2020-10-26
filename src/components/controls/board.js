import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import {OrbitView, COORDINATE_SYSTEM} from '@deck.gl/core';
import SimpleLayer from './../common/layers/simple/simple-layer';

const INITIAL_VIEW_STATE = {
    orbitAxis: 'Y',
    zoom: 7.0,
    target: [0.0, 0.0, 0.0]
  };

const Board = ({
    data,
    radius
})=>{
    
    const renderLayer = () => {
        return new SimpleLayer({
            id: 'plotter-layer',
            data,
            pickable: true,
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            getPosition: d => d.position,
            getId: d => d.id,
            getRadius: d => radius / 100,
            updateTriggers: {
                getRadius: radius
            },
            getFillColor: d => [255, 140, 120],
            getCount: d => data.length,
          });
    }

    return (
        <DeckGL
        width="100%"
        height="100%"
        layers={renderLayer()}
        views={new OrbitView()}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
      </DeckGL>
    )
};

export { Board }

