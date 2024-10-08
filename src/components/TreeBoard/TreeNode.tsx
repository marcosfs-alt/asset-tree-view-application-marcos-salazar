'use client';

import { TreeNodeProp } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

const TreeNode = ({
  name,
  children,
  isLeaf,
  onClick,
  selected,
  type,
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
      <div className="cursor-pointer flex gap-x-0.5" onClick={handleClick}>
        {!isLeaf ? (isExpanded ? '▼' : '►') : ''}
        <Image
          src={`/assets/icons/${type}.svg`}
          alt="blue color icon"
          className={`${selected ? 'filter invert sepia brightness-0 saturate-100 hue-rotate-180' : ' '}`}
          width={22}
          height={22}
        />
        {name}
      </div>
      {isExpanded && children && <div className="pl-4">{children}</div>}
    </div>
  );
};

export default TreeNode;
