import React, { useState } from 'react';

const TreeNode = ({ name, money }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{name}</div>
      <div>{money}</div>
    </div>
  );
};

const BinaryTree = () => {
  const [root, setRoot] = useState({
    name: 'Dad',
    money: 100000,
    children: [
      {
        name: 'Child 1',
        money: 50000,
        children: [
          {
            name: 'Grandchild 1',
            money: 10000
          },
          {
            name: 'Grandchild 2',
            money: 20000
          }
        ]
      },
      {
        name: 'Child 2',
        money: 60000,
        children: [
          {
            name: 'Grandchild 3',
            money: 15000
          },
          {
            name: 'Grandchild 4',
            money: 25000
          }
        ]
      }
    ]
  });

  const renderChildren = children => {
    return (
      <div style={{ display: 'flex' }}>
        {children.map(child => {
          return (
            <div style={{ marginLeft: '20px' }}>
              <TreeNode name={child.name} money={child.money} />
              {child.children && renderChildren(child.children)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TreeNode name={root.name} money={root.money} />
      {root.children && renderChildren(root.children)}
    </div>
  );
};

export default BinaryTree;
