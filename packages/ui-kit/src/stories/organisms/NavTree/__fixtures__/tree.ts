export const sampleTree = {
  totalNodes: 4,
  totalGroups: 2,
  totalLeafNodes: 2,
  data: [
    {
      value: 'group 1',
      isGroup: true,
      level: 0,
      isPrivate: false,
      children: [
        {
          value: 'leaf node 1',
          isGroup: false,
          level: 1,
          isPrivate: false,
          children: [],
        },
        {
          value: 'group 2',
          isGroup: true,
          level: 1,
          isPrivate: true,
          children: [
            {
              value: 'leaf node 2',
              isGroup: false,
              level: 2,
              isPrivate: false,
              children: [],
            },
          ],
        },
      ],
    },
  ],
}
