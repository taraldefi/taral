import * as React from "react";
const SVGComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <radialGradient
      id="a12"
      cx=".66"
      fx=".66"
      cy=".3125"
      fy=".3125"
      gradientTransform="scale(1.5)"
    >
      <stop offset="0" stop-color="#73FF4E"></stop>
      <stop offset=".3" stop-color="#73FF4E" stop-opacity=".9"></stop>
      <stop offset=".6" stop-color="#73FF4E" stop-opacity=".6"></stop>
      <stop offset=".8" stop-color="#73FF4E" stop-opacity=".3"></stop>
      <stop offset="1" stop-color="#73FF4E" stop-opacity="0"></stop>
    </radialGradient>
    <circle
      transform-origin="center"
      fill="none"
      stroke="url(#a12)"
      stroke-width="18"
      stroke-linecap="round"
      stroke-dasharray="200 1000"
      stroke-dashoffset="0"
      cx="100"
      cy="100"
      r="70"
    >
      <animateTransform
        type="rotate"
        attributeName="transform"
        calcMode="spline"
        dur="2"
        values="360;0"
        keyTimes="0;1"
        keySplines="0 0 1 1"
        repeatCount="indefinite"
      ></animateTransform>
    </circle>
    <circle
      transform-origin="center"
      fill="none"
      opacity=".2"
      stroke="#73FF4E"
      stroke-width="18"
      stroke-linecap="round"
      cx="100"
      cy="100"
      r="70"
    ></circle>
  </svg>
);
export default SVGComponent;
