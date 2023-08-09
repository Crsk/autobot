export const sampleTree = {
  totalNodes: 4,
  totalFolders: 2,
  totalLeafNodes: 2,
  data: [
    {
      value: 'folder 1',
      isFolder: true,
      level: 0,
      isPrivate: false,
      children: [
        {
          value: 'leaf node 1',
          isFolder: false,
          level: 1,
          isPrivate: false,
          children: [],
        },
        {
          value: 'folder 2',
          isFolder: true,
          level: 1,
          isPrivate: true,
          children: [
            {
              value: 'leaf node 2',
              isFolder: false,
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
