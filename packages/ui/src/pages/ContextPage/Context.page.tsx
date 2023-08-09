import React from 'react'

import { NavTree, TreeItem } from 'ui-kit/src/stories'

const tree: TreeItem[] = [
  {
    value: 'Startup',
    isFolder: true,
    level: 0,
    children: [
      {
        value: 'Y Combinator',
        isFolder: true,
        level: 1,
        children: [
          {
            value: 'Startup School',
            isFolder: true,
            level: 2,
            children: [
              { value: 'Pricing', isFolder: false, level: 3, children: [] },
              { value: 'Things to avoid', isFolder: false, level: 3, children: [] },
              { value: 'Co-founder', isFolder: false, level: 3, children: [] },
            ],
          },
          {
            value: 'Paul Graham',
            isFolder: true,
            level: 2,
            children: [{ value: 'How to get startup ideas', isFolder: false, level: 4, children: [] }],
          },
          {
            value: 'Sam Altman',
            isFolder: true,
            level: 2,
            children: [{ value: 'How to be successful', isFolder: false, level: 4, children: [] }],
          },
        ],
      },
      { value: 'My ideas', isFolder: true, level: 1, isPrivate: true, children: [] },
    ],
  },
]

const ContextPage = () => <NavTree theme="dark" tree={tree} />

export { ContextPage }
