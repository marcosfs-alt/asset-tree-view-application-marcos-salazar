export interface TreeNodeProp {
  name: string;
  children?: React.ReactNode;
  isLeaf: boolean;
  onClick?: () => void;
  selected?: boolean;
  type: string;
  sensorType?: string;
  status?: string;
  expanded?: boolean;
  onExpand?: (() => void) | (() => Promise<void>);
}
