import React from 'react';

function Line({ color, thickness, startRef, endRef }) {
  const getLineCoordinates = () => {
    const startRect = startRef.current.getBoundingClientRect();
    const endRect = endRef.current.getBoundingClientRect();
    const x1 = startRect.left + startRect.width / 2;
    const y1 = startRect.top + startRect.height / 2;
    const x2 = endRect.left + endRect.width / 2;
    const y2 = endRect.top + endRect.height / 2;
    return { x1, y1, x2, y2 };
  };

  const lineCoordinates = getLineCoordinates();
  const length = Math.sqrt(
    Math.pow(lineCoordinates.x2 - lineCoordinates.x1, 2) +
      Math.pow(lineCoordinates.y2 - lineCoordinates.y1, 2)
  );
  const angle = Math.atan2(lineCoordinates.y2 - lineCoordinates.y1, lineCoordinates.x2 - lineCoordinates.x1) * 180 / Math.PI;

  return (
    <div
      style={{
        position: 'absolute',
        top: lineCoordinates.y1,
        left: lineCoordinates.x1,
        width: length,
        height: thickness,
        backgroundColor: color,
        transform: `rotate(${angle}deg)`,
      }}
    ></div>
  );
}

export default Line;
