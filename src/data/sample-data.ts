export const columns = ['id', 'name', 'e-mail', 'message'] as const;
export type Column = (typeof columns)[number];

export type User = { [key in Column]: string };
export const users: User[] = [
  {
    id: '1',
    name: 'name1',
    'e-mail': 'info1@hoge.com',
    message: 'hellow world',
  },
  {
    id: '2',
    name: 'name2',
    'e-mail': 'info2@hoge.com',
    message: 'hellow cooking',
  },
  {
    id: '3',
    name: 'name3',
    'e-mail': 'info3@hoge.com',
    message: 'hellow speak',
  },
  {
    id: '4',
    name: 'name4',
    'e-mail': 'info4@hoge.com',
    message: 'hellow call',
  },
  {
    id: '5',
    name: 'name5',
    'e-mail': 'info5@hoge.com',
    message: 'hellow jump',
  },
  {
    id: '6',
    name: 'name6',
    'e-mail': 'info6@hoge.com',
    message: 'hellow stand',
  },
  {
    id: '7',
    name: 'name7',
    'e-mail': 'info7@hoge.com',
    message: 'hellow down',
  },
];
