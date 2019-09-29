import React from "react";

type Props = {
  size?: number,
  className?: string,
};

function Spinner({ size = 100, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: "none" }}
      width={size}
      height={size}
      className={className}
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <path
        fill="#cd1b54"
        d="M90.004 51.834a40 40 0 00-80 .332 40 42-.238 0180-.332"
      >
        <animateTransform
          attributeName="transform"
          begin="0s"
          calcMode="linear"
          dur="1s"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 50 51;360 50 51"
        />
      </path>
    </svg>
  );
}

export const SpinnerFull = ({ size, className }: { size?: number, className?: string }) => (
  <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', paddingTop: 70 }}>
    <Spinner size={size} className={className} />
  </div>
);

Spinner.Full = SpinnerFull;

export default Spinner;