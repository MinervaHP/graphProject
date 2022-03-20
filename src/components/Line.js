import React, { useRef } from "react";
import Xarrow from "react-xarrows";

const boxStyle = { border: "grey solid 2px", borderRadius: "10px", padding: "5px" };

function Line({ start, end }) {

    return (
        <Xarrow start={start} end={end} showHead={false} showTail={false} path="straight" lineColor="black" />
    );
}

export default Line;