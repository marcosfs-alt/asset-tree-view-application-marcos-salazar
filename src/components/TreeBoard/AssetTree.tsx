'use client';

import TreeNode from '@/components/TreeBoard/TreeNode';
import useSelectedItemStore from '@/store/useSelectedItemStore';
import { AssetTreeProps } from '@/types';
import { createDataIndex } from '@/utils/dataIndexer';
import { getItemType } from '@/utils/itemClassifier';
import { useEffect, useState } from 'react';

const AssetTree = ({ locations, assets }: AssetTreeProps) => {
  const { selectedItem, setSelectedItem } = useSelectedItemStore();
  const [dataIndex, setDataIndex] = useState(
    createDataIndex(locations, assets),
  );

  useEffect(() => {
    setDataIndex(createDataIndex(locations, assets));
  }, [locations, assets]);

  const renderTree = (parentId: string = 'root') => {
    const { locations: childLocations, assets: childAssets } = dataIndex[
      parentId
    ] || {
      locations: [],
      assets: [],
    };

    const nodes = [
      ...childLocations.map((location) => (
        <TreeNode
          key={location.id}
          name={location.name}
          isLeaf={false}
          type="location"
          onClick={() => setSelectedItem(location)}
          selected={location.id === selectedItem?.id}
        >
          {renderTree(location.id)}
        </TreeNode>
      )),
      ...childAssets.map((asset) => {
        const isLeaf = asset.sensorType
          ? true
          : !assets.some((child) => child.parentId === asset.id);

        const itemType = getItemType(asset);

        return (
          <TreeNode
            key={asset.id}
            name={asset.name}
            isLeaf={isLeaf}
            type={itemType}
            onClick={() => setSelectedItem(asset)}
            selected={asset.id === selectedItem?.id}
            sensorType={asset.sensorType}
            status={asset.status}
          >
            {!isLeaf && renderTree(asset.id)}
          </TreeNode>
        );
      }),
    ];

    return nodes.length > 0 ? nodes : null;
  };

  return <>{renderTree()}</>;
};

export default AssetTree;
