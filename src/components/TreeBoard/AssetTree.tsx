'use client';

import TreeNode from '@/components/TreeBoard/TreeNode';
import { Location, Asset } from '@/types';
import useSelectedItemStore from '@/store/useSelectedItemStore';
import useFilterStore from '@/store/useFilterStore';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { getItemType } from '@/utils/itemClassifier';

const AssetTree = ({
  locations,
  assets,
}: {
  locations: Location[];
  assets: Asset[];
}) => {
  const { selectedItem, setSelectedItem } = useSelectedItemStore();
  const { searchTerm, showEnergySensorsOnly, showCriticalStatusOnly } =
    useFilterStore();
  const [loadedChildren, setLoadedChildren] = useState<{
    [key: string]: { locations: Location[]; assets: Asset[] };
  }>({});

  const memoizedLoadedChildren = useMemo(
    () => loadedChildren,
    [loadedChildren],
  );

  const handleExpand = useCallback(
    async (parentId: string) => {
      if (!memoizedLoadedChildren[parentId]) {
        const childrenLocations = locations.filter(
          (loc) => loc.parentId === parentId,
        );
        const childrenAssets = assets.filter(
          (asset) =>
            asset.parentId === parentId || asset.locationId === parentId,
        );

        setLoadedChildren((prev) => ({
          ...prev,
          [parentId]: {
            locations: childrenLocations,
            assets: childrenAssets,
          },
        }));
      }
    },
    [assets, locations, memoizedLoadedChildren, setLoadedChildren],
  );

  const shouldShowAsset = useCallback(
    (asset: Asset): boolean => {
      if (!searchTerm) return true;

      if (showEnergySensorsOnly && asset.sensorType !== 'energy') {
        return false;
      }

      if (showCriticalStatusOnly && asset.status !== 'critical') {
        return false;
      }

      return asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    },
    [searchTerm, showEnergySensorsOnly, showCriticalStatusOnly],
  );

  const shouldShowLocation = useCallback(
    (location: Location): boolean => {
      if (!searchTerm) return true;

      return location.name.toLowerCase().includes(searchTerm.toLowerCase());
    },
    [searchTerm],
  );
  const isAssetInSearchPath = useCallback(
    (assetId: string): boolean => {
      if (!searchTerm) return true;

      const asset = assets.find((asset) => asset.id === assetId);
      if (asset && shouldShowAsset(asset)) {
        return true;
      }

      const childAssets = assets.filter((asset) => asset.parentId === assetId);
      return childAssets.some((child) => isAssetInSearchPath(child.id));
    },
    [assets, searchTerm, shouldShowAsset],
  );

  const isLocationInSearchPath = useCallback(
    (locationId: string): boolean => {
      if (!searchTerm) return true;

      const location = locations.find((loc) => loc.id === locationId);
      if (location && shouldShowLocation(location)) {
        return true;
      }

      const childLocations = locations.filter(
        (loc) => loc.parentId === locationId,
      );
      const childAssets = assets.filter(
        (asset) =>
          asset.locationId === locationId || asset.parentId === locationId,
      );

      return (
        childLocations.some((loc) => isLocationInSearchPath(loc.id)) ||
        childAssets.some((asset) => isAssetInSearchPath(asset.id))
      );
    },
    [assets, locations, searchTerm, shouldShowLocation, isAssetInSearchPath],
  );

  const renderTree = (locationId?: string) => {
    const filteredLocations = locations.filter((location) =>
      locationId
        ? location.parentId === locationId &&
          isLocationInSearchPath(location.id)
        : location.parentId === null && isLocationInSearchPath(location.id),
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
        expanded={isLocationInSearchPath(location.id)}
        onExpand={() => handleExpand(location.id)}
      >
        {memoizedLoadedChildren[location.id] && (
          <>
            {renderAssets(location.id)}
            {renderTree(location.id)}
          </>
        )}
      </TreeNode>
    ));
  };

  const renderAssets = (parentId: string) => {
    if (!memoizedLoadedChildren[parentId]) return null;

    const { assets: filteredAssets } = memoizedLoadedChildren[parentId];

    return filteredAssets
      .filter(
        (asset) => shouldShowAsset(asset) || isAssetInSearchPath(asset.id),
      )
      .map((asset) => {
        const isLeaf = !assets.some((child) => child.parentId === asset.id);
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
            expanded={isAssetInSearchPath(asset.id)}
            onExpand={!isLeaf ? () => handleExpand(asset.id) : undefined}
          >
            {!isLeaf &&
              memoizedLoadedChildren[asset.id] &&
              renderAssets(asset.id)}
          </TreeNode>
        );
      });
  };

  const renderIsolatedAssets = () => {
    const isolatedAssets = assets.filter(
      (asset) => !asset.locationId && !asset.parentId,
    );

    return isolatedAssets
      .filter(
        (asset) => shouldShowAsset(asset) || isAssetInSearchPath(asset.id),
      )
      .map((asset) => (
        <TreeNode
          key={asset.id}
          name={asset.name}
          isLeaf
          onClick={() => setSelectedItem(asset)}
          selected={asset.id === selectedItem?.id}
          sensorType={asset.sensorType}
          status={asset.status}
          type="component"
          expanded={isAssetInSearchPath(asset.id)}
        />
      ));
  };

  useEffect(() => {
    if (searchTerm) {
      locations.forEach((location) => {
        if (isLocationInSearchPath(location.id)) {
          handleExpand(location.id);
        }
      });
      assets.forEach((asset) => {
        if (isAssetInSearchPath(asset.id)) {
          handleExpand(asset.id);
        }
      });
    }
  }, [
    searchTerm,
    assets,
    locations,
    handleExpand,
    isAssetInSearchPath,
    isLocationInSearchPath,
  ]);

  return (
    <>
      {renderTree()}
      {renderIsolatedAssets()}
    </>
  );
};

export default AssetTree;
