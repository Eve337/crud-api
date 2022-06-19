import { User } from './../types/User';
import fs from 'fs';
import { IncomingMessage } from 'http';
import { pipeline } from 'stream';

export const writeNewUser = (path: string, file: any) => {
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
        const validUser = checkUser(body)
        if(validUser) {
          res(validUser);
        } else {
          rej(validUser);
        }
      });
    } catch (e) {
      rej(e);
    }
  })
}