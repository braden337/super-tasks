import {v4 as uuidv4} from 'uuid';

let one = uuidv4();
let two = uuidv4();
let three = uuidv4();

const fakeUsers = [
  {id: one, name: 'Prince'},
  {id: two, name: 'Oscar'},
  {id: three, name: 'Fred'},
];

const fakeTasks = [
  {
    id: one,
    description: 'Eat',
    complete: true,
    archive: true,
    user_id: one,
  },
  {
    id: two,
    description: 'Walk',
    complete: false,
    archive: false,
    user_id: two,
  },
  {
    id: three,
    description: 'Sleep',
    complete: false,
    archive: false,
    user_id: '_',
  },
];

export {fakeUsers, fakeTasks};
