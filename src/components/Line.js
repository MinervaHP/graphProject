import React, { useRef } from "react";
import Xarrow from "react-xarrows";

const boxStyle = { border: "grey solid 2px", borderRadius: "10px", padding: "5px" };

function Line({ start, end ,clickHandler}) {

    return (
        <Xarrow start={start} end={end} showHead={true} showTail={false} path="straight" lineColor="black" onClick={clickHandler} />
    );
}

export default Line;