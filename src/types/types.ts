export const ENDPOINT_USERS = '/api/users';

export enum reqMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const getUserByIdRegex = /api\/users\/([0-9]+)/;

export enum errorMessages {
  USER_NOT_FOUND = 'User not found',
  BODY_DOES_NOT_CONTAIN_REQUIRED_FIELDS ='Body does not contain required fields',
}