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
    const { filter: resultFilter } = result;

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
    setFilter(resultFilter);
  };

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
            display: 'block'
          }}
        ></span>
        <button onClick={() => generateFilter()} className="submit">
          Compute Filters
        </button>
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
      Result Filter in SVG:
      <br />
      <IHome color={filter} />
      <br />
      <br />
      {status !== "" &&
        `
        Status: ${status}`}
    </div>
  );
};

export default Home;
