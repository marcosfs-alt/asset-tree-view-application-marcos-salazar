import { Items, TreeNodeProp, sensorStatus, sensorTypes } from '@/types';
import Image from 'next/image';
import ArrowDown from '@/../../public/assets/icons/arrowDown.svg';
import EnergyIcon from '@/../../public/assets/icons/bolt.svg';
import ComponentIcon from '@/../../public/assets/icons/component.svg';
import { useState, useEffect, memo } from 'react';

const TreeNode = memo(
  ({
    name,
    children,
    isLeaf,
    onClick,
    selected,
    type,
    sensorType,
    status,
    expanded,
    onExpand,
    disableCollapse,
  }: TreeNodeProp) => {
    const [isExpanded, setIsExpanded] = useState(expanded || false);

    useEffect(() => {
      setIsExpanded(expanded || false);
    }, [expanded]);

    const toggleExpanded = () => {
      if (!isLeaf && !disableCollapse) {
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
      <div
        className={`pl-2 ${selected ? 'bg-blue500 text-white' : ''}`}
        data-testid={`treenode-${name}`}
      >
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
              alt="icon"
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
                className={`filter ${
                  status === sensorStatus.OPR
                    ? 'fill-defaultGreen'
                    : 'fill-defaultRed'
                }`}
              />
            ) : (
              <div
                className={`w-2 h-2 rounded-full ${
                  status === sensorStatus.OPR
                    ? 'bg-defaultGreen'
                    : 'bg-defaultRed'
                }`}
              ></div>
            ))}
        </div>
        {isExpanded && children && <div className="pl-4">{children}</div>}
      </div>
    );
  },
);

TreeNode.displayName = 'TreeNode';

export default TreeNode;
