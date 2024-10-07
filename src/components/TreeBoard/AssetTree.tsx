'use client';

import TreeNode from '@/components/TreeBoard/TreeNode';
import { Location, Asset } from '@/types';
import useSelectedItemStore from '@/store/useSelectedItemStore';

const AssetTree = ({
  locations,
  assets,
}: {
  locations: Location[];
  assets: Asset[];
}) => {
  const { selectedItem, setSelectedItem } = useSelectedItemStore();

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
      <TreeNode key={location.id} name={location.name}>
        {renderAssets(location.id)}
        {renderTree(location.id)}
      </TreeNode>
    ));
  };

  const renderAssets = (parentId?: string) => {
    const filteredAssets = assets.filter(
      (asset) => asset.locationId === parentId || asset.parentId === parentId,
    );

    if (filteredAssets.length === 0) {
      return null;
    }

    return filteredAssets.map((asset) => (
      <TreeNode
        key={asset.id}
        name={asset.name}
        isLeaf={!assets.some((child) => child.parentId === asset.id)}
        onClick={() => setSelectedItem(asset)}
        selected={asset.id === selectedItem?.id}
      >
        {renderAssets(asset.id)}
      </TreeNode>
    ));
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
      >
        <div className="pl-4">{asset.name}</div>
      </TreeNode>
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
