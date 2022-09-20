import {
  requestId,
  userId,
} from './proprties';

const createResponse = {
  type: 'object',
  required: ['userId', 'requestId'],
  properties: {requestId, userId}
};

export default createResponse;