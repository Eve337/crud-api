import { IncomingMessage, ServerResponse } from 'http';
import { getAll, getById } from '../models/UsersModel';


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
    const user = await getById(id);
    if (!user) {
      res.writeHead(400, { 'Content-type': 'application/json'});
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-type': 'application/json'});
      res.end(JSON.stringify(user));
    }
  } catch (e) {
    console.log('Something wrong', e);
  }
}

// @desc create single user
// @route [POST]/api/users
export async function createUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const user = await getById(id);
    if (!user) {
      res.writeHead(400, { 'Content-type': 'application/json'});
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-type': 'application/json'});
      res.end(JSON.stringify(user));
    }
  } catch (e) {
    console.log('Something wrong', e);
  }
}