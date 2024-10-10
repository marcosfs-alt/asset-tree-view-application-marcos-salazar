'use client';

import TreeNode from '@/components/TreeBoard/TreeNode';
import { Location, Asset, sensorStatus, sensorTypes } from '@/types';
import useSelectedItemStore from '@/store/useSelectedItemStore';
import useFilterStore from '@/store/useFilterStore';
import { useState, useEffect, useCallback } from 'react';
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

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const anyFilterApplied =
    searchTerm || showEnergySensorsOnly || showCriticalStatusOnly;

  const shouldShowAsset = useCallback(
    (asset: Asset): boolean => {
      const matchesFilters = (): boolean => {
        if (showEnergySensorsOnly && asset.sensorType !== sensorTypes.E) {
          return false;
        }

        if (showCriticalStatusOnly && asset.status !== sensorStatus.ALT) {
          return false;
        }

        if (
          searchTerm &&
          !asset.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }

        return true;
      };

      if (matchesFilters()) {
        return true;
      }

      const childAssets = assets.filter((child) => child.parentId === asset.id);
      return childAssets.some((child) => shouldShowAsset(child));
    },
    [searchTerm, showEnergySensorsOnly, showCriticalStatusOnly, assets],
  );

  const shouldShowLocation = useCallback(
    (location: Location): boolean => {
      const matchesSearchTerm = () =>
        searchTerm
          ? location.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true;

      const assetsInLocation = assets.filter(
        (asset) =>
          (asset.locationId === location.id ||
            asset.parentId === location.id) &&
          shouldShowAsset(asset),
      );

      const childLocations = locations.filter(
        (loc) => loc.parentId === location.id && shouldShowLocation(loc),
      );

      return (
        matchesSearchTerm() ||
        assetsInLocation.length > 0 ||
        childLocations.length > 0
      );
    },
    [searchTerm, assets, locations, shouldShowAsset],
  );

  const handleExpand = useCallback(
    (parentId: string) => {
      if (!loadedChildren[parentId]) {
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
    [assets, locations, loadedChildren],
  );

  useEffect(() => {
    if (anyFilterApplied) {
      const newExpandedNodes = new Set<string>();

      const expandAssetAncestors = (asset: Asset) => {
        let parentId = asset.parentId || asset.locationId;
        while (parentId) {
          newExpandedNodes.add(parentId);
          const parentAsset = assets.find((a) => a.id === parentId);
          const parentLocation = locations.find((l) => l.id === parentId);
          parentId =
            parentAsset?.parentId ||
            parentAsset?.locationId ||
            parentLocation?.parentId;
        }
      };

      const expandLocationAncestors = (location: Location) => {
        let parentId = location.parentId;
        while (parentId) {
          newExpandedNodes.add(parentId);
          const parentLocation = locations.find((l) => l.id === parentId);
          parentId = parentLocation?.parentId;
        }
      };

      const traverseAssets = (assetList: Asset[]) => {
        assetList.forEach((asset) => {
          if (shouldShowAsset(asset)) {
            newExpandedNodes.add(asset.id);
            expandAssetAncestors(asset);
            if (asset.parentId) {
              handleExpand(asset.parentId);
            } else if (asset.locationId) {
              handleExpand(asset.locationId);
            }
          }
          const childAssets = assets.filter(
            (child) => child.parentId === asset.id,
          );
          if (childAssets.length > 0) {
            traverseAssets(childAssets);
          }
        });
      };

      const traverseLocations = (locationList: Location[]) => {
        locationList.forEach((location) => {
          if (shouldShowLocation(location)) {
            newExpandedNodes.add(location.id);
            expandLocationAncestors(location);
            handleExpand(location.id);

            const childLocations = locations.filter(
              (loc) => loc.parentId === location.id,
            );
            if (childLocations.length > 0) {
              traverseLocations(childLocations);
            }

            const assetsInLocation = assets.filter(
              (asset) =>
                asset.locationId === location.id ||
                asset.parentId === location.id,
            );
            if (assetsInLocation.length > 0) {
              traverseAssets(assetsInLocation);
            }
          }
        });
      };

      const rootLocations = locations.filter((loc) => loc.parentId === null);
      traverseLocations(rootLocations);

      const isolatedAssets = assets.filter(
        (asset) => !asset.locationId && !asset.parentId,
      );
      traverseAssets(isolatedAssets);

      setExpandedNodes(newExpandedNodes);
    } else {
      setExpandedNodes(new Set());
      setLoadedChildren({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, showEnergySensorsOnly, showCriticalStatusOnly]);

  const renderTree = (locationId?: string) => {
    const filteredLocations = locations.filter((location) =>
      locationId
        ? location.parentId === locationId && shouldShowLocation(location)
        : location.parentId === null && shouldShowLocation(location),
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
        expanded={expandedNodes.has(location.id)}
        onExpand={() => handleExpand(location.id)}
      >
        {loadedChildren[location.id] && (
          <>
            {renderAssets(location.id)}
            {renderTree(location.id)}
          </>
        )}
      </TreeNode>
    ));
  };

  const renderAssets = (parentId: string) => {
    if (!loadedChildren[parentId]) return null;

    const { assets: filteredAssets } = loadedChildren[parentId];

    return filteredAssets
      .filter((asset) => shouldShowAsset(asset))
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
            expanded={expandedNodes.has(asset.id)}
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

    return isolatedAssets
      .filter((asset) => shouldShowAsset(asset))
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
          expanded={expandedNodes.has(asset.id)}
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
