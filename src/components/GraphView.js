
import React, { useState, useRef, useEffect, useReducer } from 'react';
import DraggableCircle from './DraggableCircle';
import Button from './Button'
import { FaPlusCircle, FaArrowsAltV, FaTrash, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Line from './Line';
import { Xwrapper } from 'react-xarrows';
import Graph from '../models/Graph';
import Vertex from '../models/Vertex';
import Edge from '../models/Edge';
import ModalWeight from './ModalWeight';
import SelectAlgorithm from './SelectAlgorithm';
import GraphService from '../services/GraphService';
import { AlgorithmType } from '../models/algorithmsModels/AlgorithmType';
import { StepActionType } from '../models/algorithmsModels/StepActionType';

const GraphView = () => {
  const [graph, setGraph] = useState(new Graph([], []));
  const [data, setData] = useState('!ברוך הבא/ה לאתר לתירגול אלגוריתמי גרפים תהנה/י ובהצלחה');
  const [canAdd, setCanAdd] = useState(true);
  const [canRemove, setCanRemove] = useState(false);
  const [canDrawLine, setCanDrawLine] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [onGraphObjectClick, setOnGraphObjectClick] = useState(() => () => undefined);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const startVertex = useRef(null);
  const endVertex = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [result, setResult] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  //משמש כדי להכריח את עידכון  הלחיצות בגרף
  useEffect(function () {
    forceUpdate();
  }, [onGraphObjectClick]);

  useEffect(function () {
    if (result && result.Steps && result.Steps.length > currentStep)
      displayAlgorithmStep();
  }, [currentStep]);

  //מעדכן את לחיצותהקודקוד להוספת קשת
  const onDrawLineClick = () => {
    setOnGraphObjectClick(() => drawLine);
    setData('לחצו על קודקוד המקור ממנו ברצונכם למתוח קשת ולאחר מכן לחצו על קודקוד היעד אליו תרצו למתוך את הקשת')
  }
  //מעדכן את הקוקודים למחיקה
  const onDeleteClick = () => {
    setOnGraphObjectClick(() => deleteObject);
    setData('לחץ על הקודקוד או על מרכז הקשת שברצונך למחוק')
  }

  //פונקצית ציור העיגולים
  const drawCircle = () => {
    if (graph.vertexes.length <= 50) {
      let currentKey = graph.vertexes.length === 0 ? 0 : parseInt(graph.getLastVertex().id) + 1;
      setData(` לחץ על הכפתור על מנת להוסיף קודקודים (שים לב הינך מוגבל ל-50 קודקודים) \n לאחר ההוספה ניתן למקם את הקודקודים במקום הרצוי ע"י גרירת הקודקוד`)

      graph.addVertex(new Vertex(currentKey, currentKey.toString()))
      setGraph(new Graph(graph.vertexes, graph.edges));
    }

    else {
      setCanAdd(false);
    }
    if (graph.vertexes.length >= 0) {
      setCanRemove(true)
    }
    if (graph.vertexes.length > 1 && !canDrawLine) {
      setCanDrawLine(true);
    }
  }



  //מצייר את הקשתות בין קודקוד לקודקוד
  const drawLine = (sender, type = 'vertex') => {
    if (type !== 'vertex')
      return;
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

  //מוסיף את הקשת עם המשקל
  const addEdge = (weight, direct) => {

    let key = graph.edges.length === 0 ? 0 : graph.getLastEdge().id + 1;
    let start = parseInt(startVertex.current['id']);
    let end = parseInt(endVertex.current['id']);

    graph.addEdge(new Edge(key, new Vertex(start, start.toString()),
      new Vertex(end, end.toString()), weight, direct));



    setGraph(new Graph(graph.vertexes, graph.edges));
    endVertex.current.style.backgroundColor = '#ffcc66';
    startVertex.current.style.backgroundColor = '#ffcc66';
    startVertex.current = null;
    setShowModal(false);
  }

  //מחיקת אוביקטים
  const deleteObject = (sender, type = 'vertex') => {

    let objectId = parseInt(sender.current['id']);
    if (type !== 'vertex') {
      graph.removeEdge(objectId)
    }
    else {

      graph.removeVertex(objectId);
      graph.removeEdgeOfVertex(objectId);
    }

    setGraph(new Graph(graph.vertexes, graph.edges));
    if (graph.vertexes.length === 0) {
      setCanRemove(false)
    }
    if (graph.vertexes.length <= 1) {
      setCanDrawLine(false);
    }
  }

  const doAlgorithm = (algorithm) => {
    let algorithmName = Object.keys(AlgorithmType)[algorithm];
    switch (algorithm) {
      case AlgorithmType.Kruskal:
        setData(`${algorithmName} נבחר אלגוריתם `);
        getAlgorithmResult(algorithm);
        break;

      case AlgorithmType.IsCircle:
        setData(` כעת יוצג האם הגרף מכיל מעגל או לא `);
        getAlgorithmResult(algorithm);
        break;
      default:

        setData(`  נא לחצ/י על קודקוד מקור על מנת להתחיל בהדגמה !${algorithmName} נבחר אלגוריתם  `);
        setOnGraphObjectClick(() => (source, type = "vertex") => { getAlgorithmResult(algorithm, source, type) });
    }

  }
  const getAlgorithmResult = (algorithm, source, type = 'vertex') => {
    const vertex = null;
    if (type !== 'vertex') {
      setData('לחיצה שגויה נא ללחוץ על קודקוד')

    }

    else {
      if (source) {
        vertex = { id: source.current['id'], text: source.current['id'] }
      }

      else {

        GraphService.compte(graph, vertex, algorithm).then((response) => {
          console.log(response.data);
          setResult(response.data);
          setShowButton(true);
        },

          (error) => { console.log(error); });
      }
    }
  }


  const displayAlgorithmStep = () => {

    if (currentStep == result.Steps.length - 1) {
      setShowButton(false);
      let order = result.FinalResult.join('->');

      setData(`${order}:סדר המעבר`);
    }
    const step = result.Steps[currentStep];
    console.log(step);
    let color;
    switch (step.Action.Type) {
      case StepActionType.Visited:
        color = '#33cc33';
        break;
      case StepActionType.Visiting:
        color = '#0066ff';
        break;
      case StepActionType.NotUsed:
        color = 'gray';
        break;
      case StepActionType.CurrentlyTested:
        color = '#ff3300';

        break;
      default:
        break;

    }
    if (color) {
      //change color
      changeGrapEntityColor(step.GraphEntity, color);
    }
    else {
      //display label
      displayLabelForGraphEntity(step.GraphEntity, step.Action.Text)
    }
  }

  const changeGrapEntityColor = (entity, color) => {
    if (entity.Type === 'Edge') {

      let edges = graph.edges.filter((e) => e.id === entity.Id);
      for (let edge of edges)
        edge.setColor(color);

    }
    else {
      let vertexes = graph.vertexes.filter((e) => e.id === entity.Id);
      for (let vertex of vertexes)
        vertex.setColor(color);
    }
    setGraph(new Graph(graph.vertexes, graph.edges));
  }

  const displayLabelForGraphEntity = (entity, label) => {

  }

  return (
    <>
      {/* //כפתורים */}

      <Button text=' הוסף קודקוד' icon={<FaPlusCircle />} action={drawCircle} isDisabled={!canAdd} />
      <Button text='מתח קשת' icon={<FaArrowsAltV />} action={onDrawLineClick} isDisabled={!canDrawLine} />
      <Button text='מחק' icon={<FaTrash />} action={onDeleteClick} isDisabled={!canRemove} />
      <SelectAlgorithm DataChange={doAlgorithm} isDisabled={!canRemove} showButton={setShowButton} />
      <ModalWeight show={showModal} handleClose={addEdge} />
      <div className='Explenation' >{data}</div>
      {/* //מקום ההתרחשות בפועל */}



      {showButton &&
        <>
          <Button icon={<FaAngleLeft />} isDisabled={currentStep === 0} text="הקודם"
            action={() => setCurrentStep(currentStep - 1)} />
          <Button icon={<FaAngleRight />} isDisabled={currentStep === result.Steps.length} text="הבא"
            action={() => setCurrentStep(currentStep + 1)} />
        </>
      }
      <div className='container' >
        <Xwrapper>

          {
            graph.vertexes.map(v => <DraggableCircle key={(v.id)}
              vKey={v.text}
              color={v.color ?? '#ffcc66'}
              clickHandler={onGraphObjectClick} />)
          }

          {
            graph.edges.map(e => <Line key={e.id} id={e.id} color={e.color ?? 'black'}
              start={(e.startVertex.id).toString()}
              end={(e.endVertex.id).toString()} showHead={e.isDirected}
              weight={e.weight.toString()} clickHandler={onGraphObjectClick} />)
          }

        </Xwrapper>
      </div>

    </>
  )
}

export default GraphView

