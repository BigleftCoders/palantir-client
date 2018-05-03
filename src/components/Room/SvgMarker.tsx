import * as React from 'react';
interface IProps {
  name: string;
  color: string;
}
const SvgMarker = (props: IProps) => {
  return (
    <svg
      width="42px"
      height="55px"
      viewBox="0 0 42 55"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="99.0214445%"
          id="linearGradient-1"
        >
          <stop stopColor="#000000" stopOpacity="0" offset="0%" />
          <stop stopColor="#000000" stopOpacity="0.02" offset="80%" />
          <stop stopColor="#000000" stopOpacity="0.04" offset="100%" />
        </linearGradient>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-2"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0.12" offset="0%" />
          <stop stopColor="#FFFFFF" stopOpacity="0.06" offset="20%" />
          <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%" />
        </linearGradient>
        <path
          d="M21,54.7105263 C35,39.9688286 42,28.7319865 42,21 C42,9.40202025 32.5979797,0 21,0 C9.40202025,0 0,9.40202025 0,21 C0,28.7319865 7,39.9688286 21,54.7105263 Z"
          id="path-3"
        />
        <filter
          x="-28.6%"
          y="-21.9%"
          width="157.1%"
          height="143.9%"
          filterUnits="objectBoundingBox"
          id="filter-4"
        >
          <feOffset
            dx="0"
            dy="0"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="4"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.12 0"
            type="matrix"
            in="shadowBlurOuter1"
          />
        </filter>
      </defs>
      <g id="Map" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Mobile">
          <g id="Oval-Copy">
            <use fill="black" fillOpacity="1" filter="url(#filter-4)" />
            <use fill={props.color} fillRule="evenodd" xlinkHref="#path-3" />
            <path
              stroke="url(#linearGradient-1)"
              strokeWidth="0.5"
              d="M21,54.3472693 C34.837118,39.7438113 41.75,28.6137839 41.75,21 C41.75,9.54009144 32.4599086,0.25 21,0.25 C9.54009144,0.25 0.25,9.54009144 0.25,21 C0.25,28.6137839 7.16288195,39.7438113 21,54.3472693 Z"
            />
            <path
              stroke="url(#linearGradient-2)"
              strokeWidth="0.5"
              d="M21,54.3472693 C34.837118,39.7438113 41.75,28.6137839 41.75,21 C41.75,9.54009144 32.4599086,0.25 21,0.25 C9.54009144,0.25 0.25,9.54009144 0.25,21 C0.25,28.6137839 7.16288195,39.7438113 21,54.3472693 Z"
            />
            <text x="50%" y="45%" textAnchor="middle" fill="white">
              {props.name}
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default SvgMarker;
