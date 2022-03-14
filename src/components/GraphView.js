import React, { useState, useRef, useEffect } from 'react';

import DraggableCircle from './DraggableCircle';
import Button from './Button'
import { FaPlusCircle, FaArrowsAltV, FaTrash } from "react-icons/fa";
import Line from './Line';

const GraphView = (saveGraph) => {
  //מבנה הנתונים ששומר את הקודקודים
  const [circlesList, setCirclesList] = useState([]);
  //מבנה הנתונים ששומר את הקשתות
  const [linesList, setLinesList] = useState([]);
  //מה יראו בתוך המקום של ההערות
  const [data, setData] = useState('!ברוך הבא/ה לאתר לתירגול אלגוריתמי גרפים תהנה/י ובהצלחה');
  //האם אפשר להוסיף עוד קודקודים או לא
  const [canAdd, setCanAdd] = useState(true);
  const [canRemove, setCanRemove] = useState(false);
  const [canDrawLine, setCanDrawLine] = useState(false);
  const [vertexProps, setVertexProps] = useState({
    "count": 0,
    "clickHandler": () => undefined
  });

  //האם הקודקוד שנלחץ ראשון או לא
  const firstVertex = useRef(null);

  const mapGraph = () => {


  }
  //מצייר קודקודים כל עוד לא הגיע ל50 אח"כ אי אפשר
  const drawCircle = () => {
    if (vertexProps.count <= 50) {
      let updated = vertexProps;
      updated.count = vertexProps.count + 1;
      setVertexProps({ ...vertexProps, ...updated });
      setData(` לחץ על הכפתור על מנת להוסיף קודקודים (שים לב הינך מוגבל ל-50 קודקודים) \n לאחר ההוספה ניתן למקם את הקודקודים במקום הרצוי ע"י גרירת הקודקוד`)
    }
    else {
      setCanAdd(false);
    }
    if (vertexProps.count >= 0) {
      setCanRemove(true)
    }
    if (vertexProps.count >= 1 && !canDrawLine) {
      setCanDrawLine(true);
    }
  }

  const onDrawLineClick = () => {
    let updated = vertexProps;
    updated.clickHandler = drawLine;
    setVertexProps({ ...vertexProps, ...updated })
  }

  const onDeleteClick = () => {
    let updated = vertexProps;
    updated.clickHandler = deleteObjects;
    setVertexProps({ ...vertexProps, ...updated });
  }

  //מצייר את הקשתות בין קודקוד לקודקוד
  const drawLine = (sender) => {
    console.log("e:", sender);
    //בודק האם הקודקוד שנלחץ הוא נקודת מוצא או לא
    if (!firstVertex.current) {
      firstVertex.current = sender;
    }
    //ברגע שנלחץ קודקוד היעד מותח את הקשת
    else {
      let line = <Line key={linesList.length} start={firstVertex.current} end={sender.current} />
      setLinesList([...linesList, line]);
      firstVertex.current = null;
    }
  }

  const deleteObjects = (sender) => {
    console.log("etyg:", sender);
          let updated = vertexProps;
      updated.count = vertexProps.count - 1;
      setVertexProps({ ...vertexProps, ...updated });

  }

  return (
    <>
      {/* //כפתורים */}


      <Button text=' הוסף קודקוד' icon={<FaPlusCircle />} action={drawCircle} isDisabled={!canAdd} />
      <Button text='מתח קשת' icon={<FaArrowsAltV />} action={onDrawLineClick} isDisabled={!canDrawLine} />
      <Button text='מחק' icon={<FaTrash />} action={onDeleteClick} isDisabled={!canRemove} />


      <div className='Explenation' >{data}</div>
      {/* //מקום ההתרחשות בפועל */}
      <div className='container'>
        {[...Array(vertexProps.count)].map((e, i) =>
          <DraggableCircle key={i} vKey={i + 1}
            clickHandler={vertexProps.clickHandler} />)}
        {linesList}
      </div>

    </>
  )
}

export default GraphView