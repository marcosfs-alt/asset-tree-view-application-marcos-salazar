'use client';

import { Items, TreeNodeProp, sensorStatus, sensorTypes } from '@/types';
import Image from 'next/image';
import ArrowDown from '@/../../public/assets/icons/arrowDown.svg';
import EnergyIcon from '@/../../public/assets/icons/bolt.svg';
import ComponentIcon from '@/../../public/assets/icons/component.svg';
import { useState } from 'react';

const TreeNode = ({
  name,
  children,
  isLeaf,
  onClick,
  selected,
  type,
  sensorType,
  status,
  onExpand,
}: TreeNodeProp) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    if (!isLeaf) {
      setIsExpanded((curr) => !curr);
      if (!isExpanded && onExpand) {
        onExpand();
      }
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
      <div
        className="cursor-pointer flex items-center gap-[4px]"
        onClick={handleClick}
      >
        {!isLeaf ? (
          isExpanded ? (
            <ArrowDown />
          ) : (
            <ArrowDown className="rotate-[270deg]" />
          )
        ) : (
          ''
        )}
        {type === Items.CPT ? (
          <ComponentIcon
            className={`${!selected ? 'fill-blue500' : 'fill-white'}`}
            width={22}
            height={22}
          />
        ) : (
          <Image
            src={`/assets/icons/${type}.svg`}
            alt="blue color icon"
            className={`${!selected ? 'fill-white' : 'fill-blue500'}`}
            width={22}
            height={22}
          />
        )}
        {name}
        {isLeaf &&
          !!sensorType &&
          (sensorType === sensorTypes.E ? (
            <EnergyIcon
              className={`filter ${status === sensorStatus.OPR ? 'fill-defaultGreen' : 'fill-defaultRed'}`}
            />
          ) : (
            <div
              className={`w-2 h-2 rounded-full ${status === sensorStatus.OPR ? 'bg-defaultGreen' : 'bg-defaultRed'}`}
            ></div>
          ))}
      </div>
      {isExpanded && children && <div className="pl-4">{children}</div>}
    </div>
  );
};

export default TreeNode;
