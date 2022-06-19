import { User } from './../types/User';
import users from '../storage/users.json';
import { v4 as uuidv4 } from 'uuid';
import { writeNewUser } from '../utils/utils';
import { errorMessages } from '../types/types';

const pathToData = './src/storage/users.json';

export const getAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

export const getById = (id: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    const user = users.find((user: User) => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject(errorMessages.USER_NOT_FOUND);
    }
  });
}

export const create = (user: User) => {
  return new Promise((resolve, reject) => {
    const temp: User[] = users;
    const newUser = {id: uuidv4(), ...user};
    temp.push(newUser);

    writeNewUser(pathToData, temp);
    resolve(newUser);
  });
}

export const update = (id: string, user: User) => {
  return new Promise((resolve, reject) => {
    const temp: User[] = users;
    const index = temp.findIndex((user) => user.id === id);

    temp[index] = { id, ...user }

    writeNewUser(pathToData, temp);
    resolve(temp[index]);
  });
}


export const remove = (id: string) => {
  return new Promise((resolve, reject) => {
    const editedUsersArr = users.filter((user: User) => user.id !== id);

    writeNewUser(pathToData, editedUsersArr);
    resolve(editedUsersArr);
  });
}