import { devWarn } from ".";
import { errorMessages } from "../constants";
import { Connection, Edge } from "../typing";

export const isNode = (element: Node | Connection | Edge): element is Node =>
  'id' in element && !('source' in element) && !('target' in element);
  
export const isEdge = (element: Node | Connection | Edge): element is Edge =>
  "id" in element && "source" in element && "target" in element;

const getEdgeId = ({
  source,
  sourceHandle,
  target,
  targetHandle,
}: Connection): string =>
  `flow__edge-${source}${sourceHandle || ""}-${target}${targetHandle || ""}`;

const connectionExists = (edge: Edge, edges: Edge[]) => {
  return edges.some(
    (el) =>
      el.source === edge.source &&
      el.target === edge.target &&
      (el.sourceHandle === edge.sourceHandle ||
        (!el.sourceHandle && !edge.sourceHandle)) &&
      (el.targetHandle === edge.targetHandle ||
        (!el.targetHandle && !edge.targetHandle))
  );
};

export const addEdge = (
  edgeParams: Edge | Connection,
  edges: Edge[]
): Edge[] => {
  if (!edgeParams.source || !edgeParams.target) {
    devWarn(errorMessages["error006"]());

    return edges;
  }

  let edge: Edge;
  if (isEdge(edgeParams)) {
    edge = { ...edgeParams };
  } else {
    edge = {
      ...edgeParams,
      id: getEdgeId(edgeParams),
    } as Edge;
  }

  if (connectionExists(edge, edges)) {
    return edges;
  }

  return edges.concat(edge);
};
