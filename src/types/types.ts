export const ENDPOINT_USERS = '/api/users';

export enum reqMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const getUserByIdRegex = /api\/users\/([0-9]+)/;