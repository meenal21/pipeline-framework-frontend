// src/DecisionNode.js
import { Handle, Position } from 'reactflow';

const DecisionNode = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #888', borderRadius: 8, background: '#fff' }}>
      <div>{data.label || 'Decision'}</div>

      <Handle type="source" position={Position.Right} id="true" style={{ top: '30%', background: 'green' }} />
      <Handle type="source" position={Position.Right} id="false" style={{ top: '70%', background: 'red' }} />
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
    </div>
  );
};

export default DecisionNode;
