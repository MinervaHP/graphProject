import UIGraphEntity from "./UIGraphEntity";

export default class Edge extends UIGraphEntity{
    id;
    startVertex;
    endVertex;
    weight;
    isDirected;
    constructor(id, startVertex, endVertex, weight, isDirected) {
        super();
        this.id = id;
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.weight = weight;
        this.isDirected = isDirected;
    }
}