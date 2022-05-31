import React from "react";
import type { NextPage } from "next";

import IHome from "../components/icons/IHome";

/* Utils */
import { hexToRgb, Color, Solver } from "../utils/color";

const Home: NextPage = () => {
  const [color, setColor] = React.useState<string>("#000000");
  const [status, setStatus] = React.useState<string>("");
  const [colorBg, setColorBg] = React.useState<string>("");
  const [filter, setFilter] = React.useState<any>("");

  const generateFilter = () => {
    const rgb: any = hexToRgb(color);
    if (rgb?.length !== 3) {
      alert("Invalid format!");
      return;
    }
    const colorRGB = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(colorRGB);
    const result = solver.solve();

    let lossMsg: string;
    if (result.loss < 1) {
      lossMsg = "This is a perfect result.";
      setStatus("This is a perfect result.");
    } else if (result.loss < 5) {
      lossMsg = "The is close enough.";
      setStatus("The is close enough.");
    } else if (result.loss < 15) {
      lossMsg = "The color is somewhat off. Consider running it again.";
      setStatus("The color is somewhat off. Consider running it again.");
    } else {
      lossMsg = "The color is extremely off. Run it again!";
      setStatus("The color is extremely off. Run it again!");
    }

    setColorBg(color);
    setFilter(result);
  };

  const ExampleUsage =
    "<svg" +
    ' width="25"' +
    ' height="24"' +
    ' viewBox="0 0 25 24"' +
    ' fill="none"' +
    ' filter="' +
    filter +
    '"' +
    ' xmlns="http://www.w3.org/2000/svg"' +
    ">" +
    " <path" +
    ' d="M3.35449 9L12.3545 2L21.3545 9V20C21.3545 20.5304 21.1438 21.0391 20.7687 21.4142C20.3936 21.7893 19.8849 22 19.3545 22H5.35449C4.82406 22 4.31535 21.7893 3.94028 21.4142C3.56521 21.0391 3.35449 20.5304 3.35449 20V9Z"' +
    ' stroke="#000000"' +
    ' strokeWidth="2"' +
    ' strokeLinecap="round"' +
    ' strokeLinejoin="round"' +
    " />" +
    " <path" +
    ' d="M9.35449 22V12H15.3545V22"' +
    ' stroke="#000000"' +
    ' strokeWidth="2"' +
    ' strokeLinecap="round"' +
    ' strokeLinejoin="round"' +
    "/>" +
    "</svg>";

  return (
    <div className="container">
      <fieldset>
        <p>
          <label>Target color </label>
          <input
            className="target"
            onChange={(e) => {
              setColor(e.target.value);
            }}
            type="text"
            placeholder="target hex"
            value={color}
          />
        </p>
        <span
          style={{
            background: `${color}`,
            width: "60px",
            height: "20px",
            marginTop: "20px",
            marginBottom: "20px",
            display: "block",
          }}
        ></span>
        <button onClick={() => generateFilter()} className="submit">
          Compute Filters
        </button>
        <span
          style={{
            marginTop: "10px",
            display: "block",
            fontWeight: "bold",
            color: "#de3f4d",
          }}
        >
          <i>
            Note: The base color in svg must be black (#000000), Otherwise it
            will affect the color result of the filter
          </i>
        </span>
        {status !== "" && (
          <>
            <br />
            <b style={{ marginBottom: "5px", display: "block" }}>Status:</b>
            Los {filter.loss.toFixed(1)} <b>{status}</b>
          </>
        )}
      </fieldset>
      <div
        style={{
          background: `${colorBg || "#000"}`,
          width: "60px",
          height: "60px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      ></div>
      {filter !== "" && (
        <>
          <b style={{ marginBottom: "5px", display: "block" }}>
            Filter result:
          </b>
          <code>filter={'"' + filter.filter + '"'}</code>
          <br />
          <br />
        </>
      )}
      <b>Example result filter in SVG:</b>
      <br />
      <IHome color={filter.filter} />
      <br />
      <br />
      {status !== "" && (
        <>
          <b>Example usage:</b> <br />
          <code style={{ marginTop: "5px", display: "block" }}>
            {" "}
            {ExampleUsage}
          </code>
        </>
      )}
      <br />
    </div>
  );
};

export default Home;
