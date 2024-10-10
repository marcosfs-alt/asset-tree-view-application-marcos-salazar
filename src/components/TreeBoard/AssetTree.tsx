'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TreeNode from '@/components/TreeBoard/TreeNode';
import { Location, Asset, sensorStatus, sensorTypes } from '@/types';
import useSelectedItemStore from '@/store/useSelectedItemStore';
import useFilterStore from '@/store/useFilterStore';
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

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const anyFilterApplied =
    !!searchTerm || showEnergySensorsOnly || showCriticalStatusOnly;

  const assetsById = useMemo(() => {
    const map = new Map<string, Asset>();
    assets.forEach((asset) => {
      map.set(asset.id, asset);
    });
    return map;
  }, [assets]);

  const locationsById = useMemo(() => {
    const map = new Map<string, Location>();
    locations.forEach((location) => {
      map.set(location.id, location);
    });
    return map;
  }, [locations]);

  const childAssetsByParentId = useMemo(() => {
    const map = new Map<string, Asset[]>();
    assets.forEach((asset) => {
      const parentId = asset.parentId || asset.locationId;
      if (parentId) {
        if (!map.has(parentId)) {
          map.set(parentId, []);
        }
        map.get(parentId)!.push(asset);
      }
    });
    return map;
  }, [assets]);

  const childLocationsByParentId = useMemo(() => {
    const map = new Map<string, Location[]>();
    locations.forEach((location) => {
      const parentId = location.parentId || 'root';
      if (!map.has(parentId)) {
        map.set(parentId, []);
      }
      map.get(parentId)!.push(location);
    });
    return map;
  }, [locations]);

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

      const childAssets = childAssetsByParentId.get(asset.id) || [];
      return childAssets.some((child) => shouldShowAsset(child));
    },
    [
      searchTerm,
      showEnergySensorsOnly,
      showCriticalStatusOnly,
      childAssetsByParentId,
    ],
  );

  const shouldShowLocation = useCallback(
    (location: Location): boolean => {
      if (!anyFilterApplied) {
        return true;
      }

      const matchesSearchTerm = searchTerm
        ? location.name.toLowerCase().includes(searchTerm.toLowerCase())
        : false;

      const assetsInLocation = (
        childAssetsByParentId.get(location.id) || []
      ).filter(shouldShowAsset);

      const childLocations = (
        childLocationsByParentId.get(location.id) || []
      ).filter(shouldShowLocation);

      return (
        matchesSearchTerm ||
        assetsInLocation.length > 0 ||
        childLocations.length > 0
      );
    },
    [
      searchTerm,
      shouldShowAsset,
      childAssetsByParentId,
      childLocationsByParentId,
      anyFilterApplied,
    ],
  );

  const handleExpand = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      if (prev.has(nodeId)) return prev;
      const newSet = new Set(prev);
      newSet.add(nodeId);
      return newSet;
    });
  }, []);

  useEffect(() => {
    if (anyFilterApplied) {
      const newExpandedNodes = new Set<string>();

      const expandAssetAncestors = (asset: Asset) => {
        let parentId = asset.parentId || asset.locationId;
        while (parentId) {
          newExpandedNodes.add(parentId);
          const parentAsset = assetsById.get(parentId);
          const parentLocation = locationsById.get(parentId);
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
          const parentLocation = locationsById.get(parentId);
          parentId = parentLocation?.parentId;
        }
      };

      const traverseAssets = (assetList: Asset[]) => {
        assetList.forEach((asset) => {
          if (shouldShowAsset(asset)) {
            newExpandedNodes.add(asset.id);
            expandAssetAncestors(asset);
          }
          const childAssets = childAssetsByParentId.get(asset.id) || [];
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

            const childLocations =
              childLocationsByParentId.get(location.id) || [];
            if (childLocations.length > 0) {
              traverseLocations(childLocations);
            }

            const assetsInLocation =
              childAssetsByParentId.get(location.id) || [];
            if (assetsInLocation.length > 0) {
              traverseAssets(assetsInLocation);
            }
          }
        });
      };

      const rootLocations = childLocationsByParentId.get('root') || [];
      traverseLocations(rootLocations);

      const isolatedAssets = assets.filter(
        (asset) => !asset.locationId && !asset.parentId,
      );
      traverseAssets(isolatedAssets);

      setExpandedNodes(newExpandedNodes);
    } else {
      setExpandedNodes(new Set());
    }
  }, [
    searchTerm,
    showEnergySensorsOnly,
    showCriticalStatusOnly,
    shouldShowAsset,
    shouldShowLocation,
    assetsById,
    locationsById,
    childAssetsByParentId,
    childLocationsByParentId,
    anyFilterApplied,
    assets,
  ]);

  const renderTree = (locationId?: string) => {
    const locationsToRender = locationId
      ? childLocationsByParentId.get(locationId) || []
      : childLocationsByParentId.get('root') || [];

    return locationsToRender
      .filter((location) => shouldShowLocation(location))
      .map((location) => (
        <TreeNode
          key={location.id}
          name={location.name}
          type="location"
          isLeaf={false}
          expanded={expandedNodes.has(location.id)}
          onExpand={() => handleExpand(location.id)}
          disableCollapse={
            !!(expandedNodes.has(location.id) && anyFilterApplied)
          }
        >
          {expandedNodes.has(location.id) && (
            <>
              {renderAssets(location.id)}
              {renderTree(location.id)}
            </>
          )}
        </TreeNode>
      ));
  };

  const renderAssets = (parentId: string) => {
    const assetsToRender = childAssetsByParentId.get(parentId) || [];

    return assetsToRender
      .filter((asset) => shouldShowAsset(asset))
      .map((asset) => {
        const isLeaf = !(
          (childAssetsByParentId.get(asset.id) ?? []).length > 0
        );
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
            disableCollapse={
              !!(expandedNodes.has(asset.id) && anyFilterApplied)
            }
          >
            {!isLeaf && expandedNodes.has(asset.id) && renderAssets(asset.id)}
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
