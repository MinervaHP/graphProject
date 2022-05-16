import React, { useRef } from "react";
import Xarrow from "react-xarrows";

function Line({ id, start, end, clickHandler, weight, showHead, color }) {
    const lineRef = useRef(null);
    return (
        <div id={id} ref={lineRef} onClick={() => clickHandler(lineRef, 'line')}>
            <Xarrow start={start} end={end} showHead={showHead} showTail={false}
                labels={<div style={{
                    fontSize: "1.5em", backgroundColor: "#ffcc88",
                    textAlign: "center", fontFamily: "fantasy", fontStyle: "ariel", borderRadius: "20%"
                    , border: "4px solid black"
                }}>{weight}</div>}
                path="straight" lineColor={color} />
        </div>
    );
}

Line.defaultProps = {
    color: 'black'
}
export default Line;