import { errorMessages, idRegex } from './../types/types';
import { User } from './../types/User';
import fs from 'fs';
import { IncomingMessage, ServerResponse } from 'http';
import { pipeline } from 'stream';

export const errorCreator = (res: ServerResponse, err: unknown) => {
  switch (err) {
    case errorMessages.USER_NOT_FOUND:
      res.writeHead(404, { 'Content-type': 'application/json'});
      break;
    case errorMessages.BODY_DOES_NOT_CONTAIN_REQUIRED_FIELDS:
      res.writeHead(400, { 'Content-type': 'application/json'});
      break;
    case errorMessages.INVALID_FORMAT_OF_ID:
      res.writeHead(400, { 'Content-type': 'application/json'});
      break;
    default:
      res.writeHead(404, { 'Content-type': 'application/json'});
      res.end(JSON.stringify({ message: errorMessages.UNKNOWN_ERROR }));
      break;
  }

  res.end(JSON.stringify({ message: err }));
}

export const checkId = (id: string) => {
  return new Promise ((res, rej) => {
    if (!idRegex.test(id)) {
      rej(errorMessages.INVALID_FORMAT_OF_ID);
    }
    res(true);
  });
}

export const writeNewUser = (path: string, file: User[]) => {
  const ws = fs.createWriteStream(path);

  pipeline(JSON.stringify(file), ws, (e) => {
    if(e) console.log(e)
  })
}

const checkUser = (body: string): User => {
  const rdyToCheck = JSON.parse(body);

  return (rdyToCheck.age && rdyToCheck.username && rdyToCheck.hobbies) ? rdyToCheck : null;
}

export const getPostData = (req: IncomingMessage): Promise<User> => {
  return new Promise((res, rej) => {
    try {
      let body: string = '';

      req.on('data', (chunk: string) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const validUser: User | null = checkUser(body)
        if(validUser) {
          res(validUser);
        } else {
          rej(errorMessages.BODY_DOES_NOT_CONTAIN_REQUIRED_FIELDS);
        }
      });
    } catch (e) {
      rej(e);
    }
  })
}