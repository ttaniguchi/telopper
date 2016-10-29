import React from 'react';

const Telop = ({ time, telops, startTimes, endTimes }) => (
  <div style={{ textAlign: 'center', verticalAlign: 'center' }}>
    {
      telops.filter((row, i) => (
        startTimes[i] &&
        endTimes[i] &&
        startTimes[i] <= time &&
        endTimes[i] >= time
      )).map((row) => (
        <h2>{row}</h2>
      ))
    }
  </div>
);
Telop.propTypes = {
  time: React.PropTypes.number.isRequired,
  telops: React.PropTypes.array.isRequired,
  startTimes: React.PropTypes.array.isRequired,
  endTimes: React.PropTypes.array.isRequired,
};
export default Telop;
