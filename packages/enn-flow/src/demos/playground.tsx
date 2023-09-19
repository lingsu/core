import { useState, useMemo, useCallback } from "react";

import {
  EnnFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from "@q25a25q/enn-flow";

export const initialNodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: "Input Node",
    },
    position: { x: 250, y: 0 },
  },
  {
    id: "2",
    data: {
      label: "Default Node",
    },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    type: "output",
    data: {
      label: "Output Node",
    },
    position: { x: 400, y: 100 },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 100, y: 200 },
    data: {
      selects: {
        "handle-0": "smoothstep",
        "handle-1": "smoothstep",
      },
    },
  },
  {
    id: "5",
    type: "output",
    data: {
      label: "custom style",
    },
    className: "circle",
    style: {
      background: "#2B6CB0",
      color: "white",
    },
    position: { x: 400, y: 200 },
  },
  {
    id: "6",
    type: "output",
    style: {
      background: "#63B3ED",
      color: "white",
      width: 100,
    },
    data: {
      label: "Node",
    },
    position: { x: 400, y: 325 },
  },
  {
    id: "7",
    type: "default",
    className: "annotation",
    data: {
      label: (
        <>
          On the bottom left you see the <strong>Controls</strong> and the
          bottom right the <strong>MiniMap</strong>. This is also just a node 🥳
        </>
      ),
    },
    draggable: false,
    selectable: false,
    position: { x: 150, y: 400 },
  },
];

export const initialEdges = [
  { id: "e1-2", source: "1", target: "2", label: "this is an edge label" },
  { id: "e1-3", source: "1", target: "3", animated: true },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    type: "smoothstep",
    sourceHandle: "handle-0",
    data: {
      selectIndex: 0,
    },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    type: "smoothstep",
    sourceHandle: "handle-1",
    data: {
      selectIndex: 1,
    },
  },
];
export default () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <EnnFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      ></EnnFlow>
    </div>
  );
};
