import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function p5w() {
  let canvas = null;

  function P5Wrapper({ sketch = () => {}, state = {}, dispatch = () => {} }) {
    console.log(`::: P5Wrapper() component has been re-rendered`);

    const sketchContainer = useRef(null);

    useEffect(() => {
      const p5 = require('p5');
      canvas = new p5(sketch, sketchContainer.current);
      canvas.state = state;
      canvas.dispatch = dispatch;

      return () => {
        canvas.remove();
      };
    }, [dispatch, sketch, state]);

    return (
      <div
        className="p-2 m-t-2 fixed w-screen lg:w-1/2 flex flex-col justify-end bg-dots"
        ref={sketchContainer}
      />
    );
  }

  P5Wrapper.propTypes = {
    state: PropTypes.object,

    dispatch: PropTypes.func,
    sketch: PropTypes.func,
  };

  P5Wrapper.defaultProps = {
    state: {},

    dispatch: () => {},
    sketch: () => {},
  };

  return memo(P5Wrapper, (_, nextProps) => {
    canvas.state = { ...nextProps.state };

    return true;
  });
}
