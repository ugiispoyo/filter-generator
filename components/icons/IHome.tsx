import React from "react";

type Props = {
  color: string;
};
function IHome({ color }: Props): any {
  return (
    <>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        style={{ height: "40px", width: "40px", marginTop: "5px" }}
        filter={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.35449 9L12.3545 2L21.3545 9V20C21.3545 20.5304 21.1438 21.0391 20.7687 21.4142C20.3936 21.7893 19.8849 22 19.3545 22H5.35449C4.82406 22 4.31535 21.7893 3.94028 21.4142C3.56521 21.0391 3.35449 20.5304 3.35449 20V9Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.35449 22V12H15.3545V22"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export default IHome;
