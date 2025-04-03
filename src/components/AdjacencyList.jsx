import React, { useState, useEffect } from "react";


const AdjacencyList = ({ nodes, edges }) => {
    const [dag, setDag] = useState({});

    useEffect(() => {
        let adjList = {};
        nodes.forEach(node => adjList[node.id] = []); // Initialize adjacency list
        edges.forEach(edge => adjList[edge.source].push(edge.target));
        setDag(adjList);
    }, [nodes, edges]); // Recompute on graph changes

    return (
        <div style={{ flex: 1, padding: "10px", borderLeft: "1px solid #ddd", overflowY: "auto" }}>
            <h3>Adjacency List</h3>
            <pre>{JSON.stringify(dag, null, 2)}</pre> {/* Pretty-print JSON */}
        </div>
    );
};

export default AdjacencyList;