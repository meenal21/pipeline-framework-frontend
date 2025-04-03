import react, { useState} from "react";
import FlowChart from "../components/FlowChart";
import AdjacencyList from "../components/AdjacencyList";



const CreatePipeline = () => {

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const handleGraphUpdate = (updatedNodes, updatedEdges) => {
        setNodes(updatedNodes);
        setEdges(updatedEdges);
    };
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <FlowChart onGraphUpdate={handleGraphUpdate}/>
            <AdjacencyList nodes={nodes} edges={edges}/>
        </div>
    )
}

export default CreatePipeline;