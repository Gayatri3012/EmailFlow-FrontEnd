import React, { useCallback, useEffect, useMemo, useState } from "react";
import { addEdge, applyEdgeChanges, applyNodeChanges, ReactFlow } from "@xyflow/react";
import  { Background,MiniMap, Controls } from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import styles from '../../styles/flowchart.module.css'
import { ColdEmailNode, DelayNode, LeadSourceNode } from './CustomNode';
import NodeModal from "./NodeModal";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { validateFlowchart } from "../../utils/validateFlowchart";
import { toast } from "react-toastify";

// Initial flowchart with a single Lead Source node
const initialNodes = [
  {
    id: uuidv4(),
    type: "leadSource",
    data: { leadSource: "" },
    position: { x: 250, y: 25 },
    sourcePosition: 'bottom',
  },
];

const FlowchartBuilder = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);

  // Local states for managing nodes, edges, modal and flowchart title
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [flowchartTitle, setFlowchartTitle] = useState('Untitled')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  // Load existing flowchart if editing
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id) {
      fetch(`https://emailflow-backend.onrender.com/emailFlow/flowchart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data?.nodes && data?.edges){
            setNodes(data.nodes);
            setEdges(data.edges);
            setFlowchartTitle(data.title)
          }
        });
    }
  }, [id]);

  // Define custom node types and inject props like modals and removal
  const nodeTypes = useMemo(
    () => ({
      coldEmail: (props) => (
        <ColdEmailNode {...props} setSelectedNode={setSelectedNode} setIsModalOpen={setIsModalOpen} removeNode={handleRemoveNode} />
      ), 
      delay: (props) => (
        <DelayNode {...props} setSelectedNode={setSelectedNode} setIsModalOpen={setIsModalOpen} removeNode={handleRemoveNode} />
      ),
      leadSource: (props) => (
        <LeadSourceNode {...props} setSelectedNode={setSelectedNode} setIsModalOpen={setIsModalOpen}  />
      ),
    }),
    []
  );

  // Save or add a node from modal
  const handleSaveNode = (nodeData) => {
    if (!selectedNode) return;
    
    setNodes((prevNodes) => {
      const existingNodeIndex = prevNodes.findIndex(node => node.id === selectedNode.id);

      if(existingNodeIndex !== -1){
        // Update existing node
        return prevNodes.map((node, index) => 
          index === existingNodeIndex ? {...node, data: nodeData} : node
        )
      } else {
        // Add new node with auto-position below the last node
        const newNodeId = selectedNode.id; 

        const lastNode = prevNodes[prevNodes.length - 1];
        const newPosition = {
          x: lastNode.position.x,
          y: lastNode.position.y + 150,
        };
  
        const newNode = {
          id: newNodeId,
          type: selectedNode.type,
          data: nodeData,
          position: newPosition,
          sourcePosition: 'bottom',
          targetPosition: 'top'
        };

        // Auto-connect new node to the last node
        setEdges((prevEdges) => {
          const edgeExists = prevEdges.some(
            (e) => e.source === lastNode.id && e.target === newNodeId
          );
  
          if (!edgeExists) {
            return [
              ...prevEdges,
              {
                id: `${lastNode.id}-${newNodeId}`,
                source: lastNode.id,
                target: newNodeId,
              },
            ];
          }
  
          return prevEdges;
        });

        return [
          ...prevNodes, newNode]
      }
    })

    setIsModalOpen(false);
  };

  // Remove a node and reconnect edges if possible
  const handleRemoveNode = (nodeId) => {
    const node = nodes.find(node => node.id === nodeId);
    if(node?.type === 'leadSource'){
      toast.error('Lead source node cannot be deleted')
      return;
    }

    // Update edges: reconnect incoming -> outgoing if node is in between
    setEdges((prevEdges) => {

      const incomingEdge = prevEdges.find(edge => edge.target === nodeId);
      const outgoingEdge = prevEdges.find(edge => edge.source === nodeId);
  
      const newEdges = prevEdges.filter(
        edge => edge.source !== nodeId && edge.target !== nodeId
      );

      if (incomingEdge && outgoingEdge) {
        newEdges.push({
          id: `${incomingEdge.source}-${outgoingEdge.target}`,
          source: incomingEdge.source,
          target: outgoingEdge.target,
        });
      }
  
      return newEdges;
    });

    
    setNodes(prevNodes => prevNodes.filter(node => node.id !== nodeId));
  }

  // Trigger modal to add a node with selected type
  const openModalToAddNode = (type) => {
    setSelectedNode({ id: uuidv4(), type, data: {} });
    setIsModalOpen(true);
  };

  // ReactFlow handlers
  const onNodesChange = useCallback((changes) => {
    setNodes((prevNodes) => applyNodeChanges(changes, prevNodes));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
  }, []);
  

  const onConnect = useCallback(
    (params) => setEdges((prevEdges) => addEdge(params, prevEdges)),
    []
  );

  // Save flowchart to backend & schedule
  const handleSaveFlowchart = async() => {
    const token = localStorage.getItem("token");
    const userId = user._id

    if (!validateFlowchart(nodes, edges, flowchartTitle)) return;

    try {
      const response = await fetch("https://emailflow-backend.onrender.com/emailFlow/flowchart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ nodes, edges , userId, title:flowchartTitle, flowchartId: id}),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Flowchart saved!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        })
        navigate('/dashboard'); 
      } else {
        toast.error(`Failed to save: ${data.error}`)
      }
      return;
    } catch (error) {
      console.error("Error saving flowchart:", error);
      toast.error('Error saving flowchart.')
    }
   
  };


  return (<div className={styles.flowchartPage}>

    {/* Sidebar for adding nodes and setting title */}
    <Sidebar 
      addNode={openModalToAddNode} 
      setTitle={setFlowchartTitle} 
      flowchartTitle={flowchartTitle} 
    />

    {/* Flowchart area */}
    <div className={styles.FlowchartContainer} style={{ width: "100%", height: "100vh" }}>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange} 
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
      {/* MiniMap & Controls */}
      <MiniMap  nodeColor={(node) => {
        if (node.type === 'coldEmail') return '#e3c5ff ';
        if (node.type === 'delay') return '#bcdefc';
        return '#fbd7e5';
      }} 
      />
        <Background/>
        <Controls />
      </ReactFlow>
    </div>

    {/* Node modal for add/edit */}
    {isModalOpen && (
        <NodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNode}
          // nodeType={selectedNode.type}
          selectedNode={selectedNode}
        />
    )}

    {/* Save & Schedule button */}
    <div className={styles.saveButtonContainer}>
        <button onClick={handleSaveFlowchart}> <img src="/save.png" alt="save " />Save & Schedule</button>
    </div>
  </div>
  
  );
};

export default FlowchartBuilder;