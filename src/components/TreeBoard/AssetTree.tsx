'use client';

import TreeNode from '@/components/TreeBoard/TreeNode';
import { Location, Asset } from '@/types';
import useSelectedItemStore from '@/store/useSelectedItemStore';
import { getItemType } from '@/utils/itemClassifier';

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
      <TreeNode key={location.id} name={location.name} type="location">
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

    return filteredAssets.map((asset) => {
      const itemType = getItemType(asset);
      const isLeaf = asset.sensorType
        ? true
        : !assets.some((child) => child.parentId === asset.id);

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
        >
          {itemType === 'asset' && renderAssets(asset.id)}
        </TreeNode>
      );
    });
  };

  const renderIsolatedAssets = () => {
    const isolatedAssets = assets.filter(
      (asset) => !asset.locationId && !asset.parentId,
    );

    return isolatedAssets.map((asset) => {
      const itemType = getItemType(asset);
      return (
        <TreeNode
          key={asset.id}
          name={asset.name}
          isLeaf
          onClick={() => setSelectedItem(asset)}
          selected={asset.id === selectedItem?.id}
          type={itemType}
          sensorType={asset.sensorType}
          status={asset.status}
        >
          {itemType === 'asset' && renderAssets(asset.id)}
        </TreeNode>
      );
    });
  };

  return (
    <>
      {renderTree()}
      {renderIsolatedAssets()}
    </>
  );
};

export default AssetTree;
