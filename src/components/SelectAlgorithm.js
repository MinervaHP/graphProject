import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import 'react-bootstrap';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlgorithmType } from '../models/algorithmsModels/AlgorithmType';

const SelectAlgorithm = ({ DataChange, isDisabled }) => {
  const style = {
    display: 'inline-block',
    background: '#000',
    color: '#fff',
    border: '2px solid',
    borderRadius: '5px',
    height: '15%',
    cursor: 'pointer',
    fontSize: '15px',
    fontFamily: 'inherit',
    borderColor: '#ffcc66'
  }
  return (
    <>
      <DropdownButton style={style} id="dropdown-item-button" disabled={isDisabled} variant="dark" title="בחר אלגוריתם"   >
      
        <Dropdown.Item as="button" onClick={() => DataChange(AlgorithmType.Bfs)}>BFS</Dropdown.Item>
        <Dropdown.Item as="button" o onClick={() => DataChange(AlgorithmType.Dfs)} >DFS</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => DataChange(AlgorithmType.Dijkstra)} >דייקסטרה</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => DataChange(AlgorithmType.BellmanFord)} > בלמן ופורד</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => DataChange(AlgorithmType.Kruskal)} >קרוסקל</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => DataChange(AlgorithmType.IsCircle)} >האם יש מעגל</Dropdown.Item>
      </DropdownButton>

    </>
  )
}

export default SelectAlgorithm