export interface INode {
  id: string;
}

export interface ILink {
  source: string;
  target: string;
  color?: string;
  fontColor?: string;
  isHightLight?: boolean;
  strokeColor?: string;
}

export interface IGraph {
  nodes: INode[];
  links: ILink[];
}
