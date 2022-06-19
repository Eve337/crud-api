import { checkId, errorCreator } from './../utils/utils';
import { remove } from './../models/UsersModel';
import { IncomingMessage, ServerResponse } from 'http';
import { getAll, getById, create, update } from '../models/UsersModel';
import { User } from '../types/User';
import { getPostData } from '../utils/utils';


// @desc Gets all users
// @route [GET]/api/users
export async function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await getAll();
    res.writeHead(200, { 'Content-type': 'application/json'});
    res.end(JSON.stringify(users));
  } catch (e) {
    console.log('Something wrong', e);
  }
}

// @desc Gets single user
// @route [GET]/api/users/{id}
export async function getUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    await checkId(id);
    const user = await getById(id);
    res.writeHead(200, { 'Content-type': 'application/json'});
    res.end(JSON.stringify(user));
  } catch (e) {
    errorCreator(res, e);
  }
}

// @desc create single user
// @route [POST]/api/users
export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getPostData(req);

    if (body) {
      const newUser = await create(body);
      res.writeHead(201, { 'Content-type': 'application/json'});
      res.end(JSON.stringify(newUser));
    }
  } catch (e) {
    errorCreator(res, e);
  }
}

// @desc update single user
// @route [PUT]/api/users/{id}
export async function updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    await checkId(id);

    const user: User = await getById(id);
    
    const body = await getPostData(req);

    if (body) {
      const { username, age, hobbies } = body;

      const updatedData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      }
      const updatedUser = await update(id, updatedData);
      res.writeHead(200, { 'Content-type': 'application/json'});
      res.end(JSON.stringify(updatedUser));
    }
  
  } catch (e) {
    errorCreator(res, e);
  }
}


// @desc delete single user
// @route [DELETE]/api/users/{id}
export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    await checkId(id);
    await getById(id);
    await remove(id);

    res.writeHead(200, { 'Content-type': 'application/json'});
    res.end(JSON.stringify({ message: `User ${id} has been removed`}));
    
  } catch (e) {
    errorCreator(res, e);
  }
}