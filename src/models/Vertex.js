import UIGraphEntity from "./UIGraphEntity";

export default class Vertex extends UIGraphEntity {
    id;
    text;
    constructor(id, text) {
        super();
        this.id = id;
        this.text = text;
    }
}