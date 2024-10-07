'use client';

import { TreeNodeProp } from '@/types';
import { useState } from 'react';

const TreeNode = ({
  name,
  children,
  isLeaf,
  onClick,
  selected,
}: TreeNodeProp) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    if (!isLeaf) {
      setIsExpanded((curr) => !curr);
    }
  };

  const handleClick = () => {
    if (isLeaf && onClick) {
      onClick();
      return;
    }
    toggleExpanded();
  };

  return (
    <div className={`pl-2 ${selected ? 'bg-blue500 text-white' : ''}`}>
      <div className="cursor-pointer" onClick={handleClick}>
        {!isLeaf ? (isExpanded ? '▼' : '►') : ''} {name}
      </div>
      {isExpanded && children && <div className="pl-4">{children}</div>}
    </div>
  );
};

export default TreeNode;
