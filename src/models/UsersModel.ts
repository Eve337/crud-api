import { User } from './../types/User';
import users from '../storage/users.json';
import { v4 as uuidv4 } from 'uuid';
import { writeNewUser } from '../utils/utils';

export const getAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

export const getById = (id: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    const user = users.find((user: User) => user.id === id);
    console.log(user);
    if (user) {
      resolve(user);
    } else {
      reject(false);
    }
  });
}

export const create = (user: User) => {
  return new Promise((resolve, reject) => {
    const newUser = {id: uuidv4(), ...user};
    users.push(newUser);

    writeNewUser('./src/storage/users.json', users);
    resolve(newUser);
  });
}

export const update = (id: string, user: User) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((user) => user.id === id);

    users[index] = { id, ...user }

    writeNewUser('./src/storage/users.json', users);
    resolve(users[index]);
  });
}

