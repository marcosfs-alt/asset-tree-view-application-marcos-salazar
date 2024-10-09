'use client';

import TreeNode from '@/components/TreeBoard/TreeNode';
import { Location, Asset } from '@/types';
import useSelectedItemStore from '@/store/useSelectedItemStore';
import { useState } from 'react';
import { getItemType } from '@/utils/itemClassifier';

const AssetTree = ({
  locations,
  assets,
}: {
  locations: Location[];
  assets: Asset[];
}) => {
  const { selectedItem, setSelectedItem } = useSelectedItemStore();
  const [loadedChildren, setLoadedChildren] = useState<{
    [key: string]: { locations: Location[]; assets: Asset[] };
  }>({});

  const handleExpand = async (parentId: string) => {
    if (!loadedChildren[parentId]) {
      const childrenLocations = locations.filter(
        (loc) => loc.parentId === parentId,
      );
      const childrenAssets = assets.filter(
        (asset) => asset.parentId === parentId || asset.locationId === parentId,
      );

      setLoadedChildren((prev) => ({
        ...prev,
        [parentId]: {
          locations: childrenLocations,
          assets: childrenAssets,
        },
      }));
    }
  };

  const renderTree = (locationId?: string) => {
    const filteredLocations = locations.filter((location) =>
      locationId
        ? location.parentId === locationId
        : location.parentId === null,
    );

    if (filteredLocations.length === 0) {
      return null;
    }

    return filteredLocations.map((location) => (
      <TreeNode
        key={location.id}
        name={location.name}
        type="location"
        isLeaf={false}
        onExpand={() => handleExpand(location.id)}
      >
        {loadedChildren[location.id] ? (
          <>
            {renderAssets(location.id)}
            {renderTree(location.id)}
          </>
        ) : null}
      </TreeNode>
    ));
  };

  const renderAssets = (parentId: string) => {
    if (!loadedChildren[parentId]) return null;

    const { assets: filteredAssets } = loadedChildren[parentId];

    return filteredAssets.map((asset) => {
      const isLeaf = asset.sensorType
        ? true
        : !assets.some((child) => child.parentId === asset.id);
      const itemType = getItemType(asset);

      return (
        <TreeNode
          key={asset.id}
          name={asset.name}
          isLeaf={isLeaf}
          onClick={() => setSelectedItem(asset)}
          selected={asset.id === selectedItem?.id}
          type={itemType}
          sensorType={asset.sensorType}
          status={asset.status}
          onExpand={!isLeaf ? () => handleExpand(asset.id) : undefined}
        >
          {!isLeaf && loadedChildren[asset.id] && renderAssets(asset.id)}
        </TreeNode>
      );
    });
  };

  const renderIsolatedAssets = () => {
    const isolatedAssets = assets.filter(
      (asset) => !asset.locationId && !asset.parentId,
    );

    return isolatedAssets.map((asset) => (
      <TreeNode
        key={asset.id}
        name={asset.name}
        isLeaf
        onClick={() => setSelectedItem(asset)}
        selected={asset.id === selectedItem?.id}
        sensorType={asset.sensorType}
        status={asset.status}
        type="component"
      />
    ));
  };

  return (
    <>
      {renderTree()}
      {renderIsolatedAssets()}
    </>
  );
};

export default AssetTree;
