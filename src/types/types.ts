export const ENDPOINT_USERS = '/api/users';

export enum reqMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const getUserByIdRegex = /api\/users\/([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/i;

export const idRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export enum errorMessages {
  USER_NOT_FOUND = 'User not found',
  BODY_DOES_NOT_CONTAIN_REQUIRED_FIELDS ='Body does not contain required fields',
  INVALID_FORMAT_OF_ID = 'Invalid format of id',
  UNKNOWN_ERROR = 'Unknown error'
}