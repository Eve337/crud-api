import { User } from './../types/User';
import users from '../storage/users.json';

export const getAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
}

export const getById = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user: User) => user.id === id);
    resolve(user);
  });
}