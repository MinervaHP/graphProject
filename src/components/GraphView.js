import React, { useState, useRef, useEffect, useReducer } from 'react';

import DraggableCircle from './DraggableCircle';
import Button from './Button'
import { FaPlusCircle, FaArrowsAltV, FaTrash } from "react-icons/fa";
import Line from './Line';
import { Xwrapper } from 'react-xarrows';
import GraphService from '../services/GraphService';
import Graph from '../models/Graph';
import Vertex from '../models/Vertex';
import Edge from '../models/Edge';
import ModalWeight from './ModalWeight';

const GraphView = (saveGraph) => {
  const [graph, setGraph] = useState(new Graph([], []));
  //מה יראו בתוך המקום של ההערות
  const [data, setData] = useState('!ברוך הבא/ה לאתר לתירגול אלגוריתמי גרפים תהנה/י ובהצלחה');
  //האם אפשר להוסיף עוד קודקודים או לא
  const [canAdd, setCanAdd] = useState(true);
  const [canRemove, setCanRemove] = useState(false);
  const [canDrawLine, setCanDrawLine] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [onVertexClick, setOnVertexClick] = useState(() => () => undefined);
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const startVertex = useRef(null);
  const endVertex = useRef(null);


  //מצייר קודקודים כל עוד לא הגיע ל50 אח"כ אי אפשר
  useEffect(function () {
    forceUpdate();
  }, [onVertexClick])

  const drawCircle = () => {
    if (graph.vertexes.length <= 50) {
      let currentKey = graph.vertexes.length == 0 ? 0 : parseInt(graph.getLastVertex().id) + 1;
      graph.addVertex(new Vertex(currentKey, (currentKey + 1).toString()))
      setGraph(new Graph(graph.vertexes, graph.edges));
      setData(` לחץ על הכפתור על מנת להוסיף קודקודים (שים לב הינך מוגבל ל-50 קודקודים) \n לאחר ההוספה ניתן למקם את הקודקודים במקום הרצוי ע"י גרירת הקודקוד`)
    }
    else {
      setCanAdd(false);
    }
    if (graph.vertexes.length >= 0) {
      setCanRemove(true)
    }
    if (graph.vertexes.length >= 1 && !canDrawLine) {
      setCanDrawLine(true);
    }
  }
  const onDrawLineClick = () => {
    setOnVertexClick(() => drawLine);
    setData('לחצו על קודקוד המקור ממנו ברצונכם למתוח קשת ולאחר מכן לחצו על קודקוד היעד אליו תרצו למתוך את הקשת')
  }

  const onDeleteClick = () => {
    setOnVertexClick(() => deleteObject);
    setData('לחץ על הקודקוד  שברצונך למחוק')
  }

  //מצייר את הקשתות בין קודקוד לקודקוד
  const drawLine = (sender) => {

    //בודק האם הקודקוד שנלחץ הוא נקודת מוצא או לא
    if (!startVertex.current) {
      startVertex.current = sender.current;
    }
    //ברגע שנלחץ קודקוד היעד מותח את הקשת
    else {

      endVertex.current = sender.current;
      setShowModal(true);
    }
  }

  const addEdge = (weight) => {
    let key = graph.edges.length == 0 ? 0 : graph.getLastEdge().id + 1;
    let start = parseInt(startVertex.current['id']);
    let end = parseInt(endVertex.current['id']);
    graph.addEdge(new Edge(key, new Vertex(start - 1, start.toString()),
      new Vertex(end - 1, end.toString()), weight, true));

    setGraph(new Graph(graph.vertexes, graph.edges));
    endVertex.current.style.backgroundColor = '#ffcc66';
    startVertex.current.style.backgroundColor = '#ffcc66';
    startVertex.current = null;
  }

  const deleteObject = (sender) => {
    let objectId = parseInt(sender.current['id']) - 1;
    //TODO:implement for edge too
    graph.removeVertex(objectId);
    graph.removeEdgeOfVertex(objectId);
    setGraph(new Graph(graph.vertexes, graph.edges))
  }

  return (
    <>
      {/* //כפתורים */}


      <Button text=' הוסף קודקוד' icon={<FaPlusCircle />} action={drawCircle} isDisabled={!canAdd} />
      <Button text='מתח קשת' icon={<FaArrowsAltV />} action={onDrawLineClick} isDisabled={!canDrawLine} />
      <Button text='מחק' icon={<FaTrash />} action={onDeleteClick} isDisabled={!canRemove} />

      <ModalWeight changeText = {(newVal) => setShowModal(newVal)} showModal={showModal} handleClose={addEdge} />
      <div className='Explenation' >{data}</div>
      {/* //מקום ההתרחשות בפועל */}
      <div className='container'>
        <Xwrapper>

          {
            graph.vertexes.map(v => <DraggableCircle key={v.id}
              vKey={v.text}
              clickHandler={onVertexClick} />)
          }

          {
            graph.edges.map(e => <Line key={e.id}
              start={(e.startVertex.id + 1).toString()}
              end={(e.endVertex.id + 1).toString()} labels={e.weight} clickHandler={deleteObject}  />)
          }

        </Xwrapper>
      </div>

    </>
  )
}

export default GraphView