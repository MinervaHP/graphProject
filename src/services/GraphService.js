
import axios from "./Axios";

const BASE_URL = "https://localhost:44377/api";

export default class GraphService {
    static async compte(graph, source, algorithm) {
        const response = await axios.post(
            '/graph/compute',
            { graph: graph, source: source, algorithm: algorithm },
            { headers: { 'Content-Type': 'application/json' } }
        )
        return response;
    }
}