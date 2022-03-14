import React from 'react'
import Draggable from 'react-draggable'
import { useState } from 'react';



const DraggableCircle = ({ vKey, clickHandler }) => {
    const [isDragging, setIsDragging] = useState(false);
    const nodeRef = React.useRef(null);
    const style = {
        border: '1px solid black', backgroundColor: '#ffcc66',
        borderRadius: '50%', width: '50px', height: '50px', fontSize: 'xx-large',
        cursor: 'all-scroll', display: 'inline-block', margin: '2px'
    };
    //בודק האם עכשיו הקודקוד נלחץ או נגרר
    const eventControl = (event, info) => {


        if (event.type === 'mousemove' || event.type === 'touchmove') {
            setIsDragging(true)
        }

        if (event.type === 'mouseup' || event.type === 'touchend') {
            setTimeout(() => {
                setIsDragging(false);
            }, 100);

        }
    }
    //שולח לבדיקה האם הקודקוד נלחץאו נגרר
    const handleClick = (sender, handler) => {
        if (isDragging)
            return;
        handler(sender);
    };
    return (
        <Draggable bounds="parent" nodeRef={nodeRef} onDrag={eventControl}
            onStop={eventControl}>
            <div ref={nodeRef} id={vKey} style={style}
                onClick={() => handleClick(nodeRef, clickHandler)}>
                <div>{vKey}</div>
            </div>
        </Draggable>
    )
}


export default DraggableCircle