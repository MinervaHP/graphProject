import React, { useState, useRef, useEffect } from 'react';

import DraggableCircle from './DraggableCircle';
import Button from './Button'
import { FaPlusCircle, FaArrowsAltV, FaTrash } from "react-icons/fa";
import Line from './Line';
import { Xwrapper } from 'react-xarrows';

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
  const [onVertexClick, setOnVertexClick] = useState(() => () => undefined);

  //האם הקודקוד שנלחץ ראשון או לא
  const firstVertex = useRef(null);

  const mapGraph = () => {


  }
  //מצייר קודקודים כל עוד לא הגיע ל50 אח"כ אי אפשר
  useEffect(function () {

    let newList =
      circlesList.map((circle, i) => {
        return React.cloneElement(
          circle,
          { clickHandler: onVertexClick }
        )

      });
    setCirclesList(newList);
  }, [onVertexClick])

  const drawCircle = () => {
    if (circlesList.length <= 50) {
      let currentKey = circlesList.length == 0 ? 0 : parseInt(circlesList[circlesList.length - 1].key) + 1;
      setCirclesList([...circlesList, <DraggableCircle key={currentKey}
        vKey={currentKey + 1}
        clickHandler={onVertexClick} />]);
      setData(` לחץ על הכפתור על מנת להוסיף קודקודים (שים לב הינך מוגבל ל-50 קודקודים) \n לאחר ההוספה ניתן למקם את הקודקודים במקום הרצוי ע"י גרירת הקודקוד`)
    }
    else {
      setCanAdd(false);
    }
    if (circlesList.length >= 0) {
      setCanRemove(true)
    }
    if (circlesList.length >= 1 && !canDrawLine) {
      setCanDrawLine(true);
    }
  }
  const onDrawLineClick = () => {
    setOnVertexClick(() => drawLine);
    setData('לחצו על קודקוד המקור ממנו ברצונכם למתוח קשת ולאחר מכן לחצו על קודקוד היעד אליו תרצו למתוך את הקשת')
  }

  const onDeleteClick = () => {
    setOnVertexClick(() => deleteObjects);
    setData('לחץ על הקודקוד  שברצונך למחוק')
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
      let key = Math.floor(Math.random() * 100);

      setLinesList(prevList => [...prevList,
      <Line key={key} start={firstVertex.current} end={sender} />]);
      sender.current.style.backgroundColor = '#ffcc66';
      firstVertex.current.current.style.backgroundColor = '#ffcc66';
      firstVertex.current = null;
    }
  }

  const deleteObjects = (sender) => {

    const circleDelete = circlesList.filter(item => {
      return item.props.vKey != sender.current['id'];
    });
    setCirclesList(circleDelete);

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
        <Xwrapper>
          {circlesList}
          {linesList}
        </Xwrapper>
      </div>

    </>
  )
}

export default GraphView