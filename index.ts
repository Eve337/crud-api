import { getUserByIdRegex, reqMethods, ENDPOINT_USERS } from './src/types/types'
import http from 'http';
import 'dotenv/config';
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from './src/controllers/UsersController';

const PORT = process.env.PORT || 5000;

export const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  if (req.url === ENDPOINT_USERS && req.method === reqMethods.GET) {
    getAllUsers(req, res);
  } else if (req.url?.match(getUserByIdRegex) && req.method === reqMethods.GET) {
    const id = req.url.split('/')[3];
    getUser(req, res, id);
  } else if (req.url === ENDPOINT_USERS && req.method === reqMethods.POST) {
    createUser(req, res);
  } else if (req.url?.match(getUserByIdRegex) && req.method === reqMethods.PUT) {
    const id = req.url.split('/')[3];
    updateUser(req, res, id);
  } else if (req.url?.match(getUserByIdRegex) && req.method === reqMethods.DELETE) {
    const id = req.url.split('/')[3];
    deleteUser(req, res, id);
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Page not found'}));
  }
  
}).listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;