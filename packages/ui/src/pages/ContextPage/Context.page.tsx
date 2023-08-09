import React from 'react'
import { NavTree, Tree } from 'ui-kit/src/stories'

const navItems: Tree = [
  {
    value: 'Startup',
    isGroup: true,
    level: 0,
    children: [
      {
        value: 'Y Combinator',
        isGroup: true,
        level: 1,
        children: [
          {
            value: 'Startup School',
            isGroup: true,
            level: 2,
            children: [
              { value: 'Pricing', isGroup: false, level: 3, children: [] },
              { value: 'Things to avoid', isGroup: false, level: 3, children: [] },
              { value: 'Co-founder', isGroup: false, level: 3, children: [] },
            ],
          },
          { value: 'Paul Graham', isGroup: true, level: 2, children: [] },
        ],
      },
      { value: 'Ideas', isGroup: true, level: 1, isPrivate: true, children: [] },
    ],
  },
]

const ContextPage = () => <NavTree theme="dark" tree={navItems} />

export { ContextPage }
