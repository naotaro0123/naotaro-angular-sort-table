import { Column } from 'jspreadsheet-ce';

export const columns = ['name', 'title', 'mask'] as const;

export type User = Column;
export const users: User[] = [
  {
    name: 'name1',
    title: 'title1',
    mask: 'hellow world',
    type: 'text',
    width: 160,
  },
  {
    name: 'name2',
    title: 'title2',
    mask: 'hellow cooking',
    type: 'text',
    width: 160,
  },
  {
    name: 'name3',
    title: 'title3',
    mask: 'hellow speak',
    type: 'text',
    width: 160,
  },
  {
    name: 'name4',
    title: 'title4',
    mask: 'hellow call',
    type: 'text',
    width: 160,
  },
  {
    name: 'name5',
    title: 'title5',
    mask: 'hellow jump',
    type: 'text',
    width: 160,
  },
];
