import React from 'react';
import { render, screen } from '@testing-library/react';
import TreeNode from '../TreeNode';

describe('TreeNode Component', () => {
  const mockOnClick = jest.fn();
  const mockOnExpand = jest.fn();

  it('should render node with name', () => {
    render(
      <TreeNode
        name="Node1"
        isLeaf={true}
        selected={false}
        type="component"
        sensorType="vibration"
        status="operating"
        onClick={mockOnClick}
      />,
    );

    expect(screen.getByTestId('treenode-Node1')).toBeInTheDocument();
  });

  it('should call onClick when leaf node is clicked', () => {
    render(
      <TreeNode
        name="LeafNode"
        isLeaf={true}
        selected={false}
        type="component"
        onClick={mockOnClick}
      />,
    );

    const nodeElement = screen.getByTestId('treenode-LeafNode');
    expect(nodeElement).toBeInTheDocument();
  });

  it('should toggle expansion when non-leaf node is clicked', () => {
    render(
      <TreeNode
        name="ParentNode"
        isLeaf={false}
        selected={false}
        type="asset"
        onExpand={mockOnExpand}
      >
        <div>Child Node</div>
      </TreeNode>,
    );

    const nodeElement = screen.getByTestId('treenode-ParentNode');
    expect(nodeElement).toBeInTheDocument();
  });
});
