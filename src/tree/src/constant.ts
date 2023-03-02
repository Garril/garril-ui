// 子节点左边的tab缩进px
export const NODE_LEFT_INDENT = 24
export const NODE_HEIGHT = 28

export const TREE_TEST_DATA = [
  {
    label: 'vue3',
    id: '1',
    level: 1,
    expanded: false,
    children: [
      {
        label: 'ts',
        id: '5',
        parentId: '1',
        level: 2,
        checked: true
      },
      {
        label: 'nacos',
        id: '10',
        parentId: '1',
        level: 2,
        checked: false
      }
    ]
  },
  {
    label: 'vite',
    id: '2',
    expanded: true,
    level: 1,
    children: [
      {
        label: 'ui',
        id: '3',
        parentId: '2',
        expanded: false,
        level: 2,
        children: [
          {
            label: 'cli--1',
            id: '4',
            parentId: '3',
            level: 3,
            children: [
              {
                label: 'inner-1',
                id: '111',
                parentId: '4',
                level: 4,
                isLeaf: true
              },
              {
                label: 'inner-2',
                id: '222',
                parentId: '4',
                level: 4,
                isLeaf: true
              },
              {
                label: 'inner-3',
                id: '333',
                parentId: '4',
                level: 4,
                isLeaf: true
              }
            ]
          },
          {
            label: 'cli--2',
            id: '14',
            parentId: '3',
            isLeaf: true,
            level: 3
          }
        ]
      },
      {
        label: 'java',
        id: '7',
        parentId: '2',
        expanded: true,
        level: 2,
        children: [
          {
            label: 'spring',
            id: '8',
            parentId: '7',
            isLeaf: true,
            level: 3
          }
        ]
      }
    ]
  },
  {
    label: 'tsnd',
    id: '6',
    level: 1
  }
]
