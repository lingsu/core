import { CSSProperties, ReactNode } from "react";
import { internalsSymbol } from "./utils";



export type Node<T = any> = {
  id: string;
  position: XYPosition;
  data: T;
  type?: string;
  style?: CSSProperties;
  className?: string;
  sourcePosition?: Position;
  targetPosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  width?: number | null;
  height?: number | null;
  parentNode?: string;
  zIndex?: number;
  extent?: "parent" | CoordinateExtent;
  expandParent?: boolean;
  positionAbsolute?: XYPosition;
  ariaLabel?: string;
  focusable?: boolean;
  resizing?: boolean;

  // only used internally
  [internalsSymbol]?: {
    z?: number;
    handleBounds?: NodeHandleBounds;
    isParent?: boolean;
  };
};


export type NodeDimensionChange = {
  id: string;
  type: 'dimensions';
  dimensions?: Dimensions;
  updateStyle?: boolean;
  resizing?: boolean;
};

export type NodePositionChange = {
  id: string;
  type: 'position';
  position?: XYPosition;
  positionAbsolute?: XYPosition;
  dragging?: boolean;
};

export type NodeSelectionChange = {
  id: string;
  type: 'select';
  selected: boolean;
};

export type NodeRemoveChange = {
  id: string;
  type: 'remove';
};

export type NodeAddChange<NodeData = any> = {
  item: Node<NodeData>;
  type: 'add';
};

export type NodeResetChange<NodeData = any> = {
  item: Node<NodeData>;
  type: 'reset';
};

export type NodeChange =
  | NodeDimensionChange
  | NodePositionChange
  | NodeSelectionChange
  | NodeRemoveChange
  | NodeAddChange
  | NodeResetChange;


type EdgeLabelOptions = {
  label?: string | ReactNode;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
};


type DefaultEdge<T = any> = {
  id: string;
  type?: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  style?: CSSProperties;
  animated?: boolean;
  hidden?: boolean;
  deletable?: boolean;
  data?: T;
  className?: string;
  sourceNode?: Node;
  targetNode?: Node;
  selected?: boolean;
  // markerStart?: EdgeMarkerType;
  // markerEnd?: EdgeMarkerType;
  zIndex?: number;
  ariaLabel?: string;
  interactionWidth?: number;
  focusable?: boolean;
  // updatable?: EdgeUpdatable;
} & EdgeLabelOptions;

export type Edge<T = any> = DefaultEdge<T>;



export type NodeHandleBounds = {
  source: HandleElement[] | null;
  target: HandleElement[] | null;
};
export type HandleType = "source" | "target";

export type HandleElement = XYPosition &
  Dimensions & {
    id?: string | null;
    position: Position;
  };

export type ConnectingHandle = {
  nodeId: string;
  type: HandleType;
  handleId?: string | null;
};

export type HandleProps = {
  type: HandleType;
  position: Position;
  isConnectable?: boolean;
  isConnectableStart?: boolean;
  isConnectableEnd?: boolean;
//   onConnect?: OnConnect;
//   isValidConnection?: (connection: Connection) => boolean;
  id?: string;
};

export enum Position {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}

export interface XYPosition {
  x: number;
  y: number;
}

export type XYZPosition = XYPosition & { z: number };

export interface Dimensions {
  width: number;
  height: number;
}

export interface Rect extends Dimensions, XYPosition {}

export interface Box extends XYPosition {
  x2: number;
  y2: number;
}

export type Transform = [number, number, number];

export type CoordinateExtent = [[number, number], [number, number]];


export type EdgeSelectionChange = NodeSelectionChange;
export type EdgeRemoveChange = NodeRemoveChange;
export type EdgeAddChange<EdgeData = any> = {
  item: Edge<EdgeData>;
  type: 'add';
};
export type EdgeResetChange<EdgeData = any> = {
  item: Edge<EdgeData>;
  type: 'reset';
};
export type EdgeChange = EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange | EdgeResetChange;



export interface Connection {
  source: string | null;
  target: string | null;
  sourceHandle: string | null;
  targetHandle: string | null;
}