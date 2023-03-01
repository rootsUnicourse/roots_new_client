import React from 'react';

const TreeNode = ({ name, picture, moneyEarned, children }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <img src={picture } alt={ name } style={{ width: 50, height: 50, borderRadius: '50%' }} />
    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
      <div>{ name }</div>
      <div>{ moneyEarned }</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
      { children[0] && <TreeNode { ...children[0] } /> }
      { children[1] && <TreeNode { ...children[1] } /> }
    </div>
  </div>
);

export default TreeNode;
