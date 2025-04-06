import { toast } from "react-toastify";

// Validates the flowchart structure before saving
export const validateFlowchart = (nodes, edges, flowchartTitle) => {

    // Find Lead Source node with filled data
    const leadSourceNode = nodes.find((node) => node.type === "leadSource" && node.data.leadSource?.trim());

    // Get all Cold Email nodes
    const coldEmailNodes = nodes.filter((node) => node.type === "coldEmail");

    // Ensure at least one valid Lead Source node is present
    if (!leadSourceNode) {
        toast.error('Please add and fill the Lead Source node.');
        return false;
    }

    // Ensure at least one Cold Email node exists
    if (coldEmailNodes.length === 0) {
        toast.error('Add at least one Cold Email node.')
        return false;
    }

    const delayNodes = nodes.filter((node) => node.type === "delay");

    // Check if two Delay nodes are directly connected (not allowed)
    const delayConnections = edges.filter(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        return sourceNode?.type === "delay" && targetNode?.type === "delay";
    });

    if (delayConnections.length > 0) {
        toast.error('Two Delay nodes cannot be connected directly.')
        return false;
    }

     // All validations passed
    return true;
};