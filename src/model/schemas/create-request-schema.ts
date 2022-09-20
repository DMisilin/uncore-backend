import {
  userId,
  typeId,
  activityId,
  title,
  description,
  countryId,
  cityId,
} from './proprties';

const createResponse = {
  type: 'object',
  required: [
    'userId',
    'typeId',
    'activityId',
    'title',
    'description',
  ],
  properties: {
    userId,
    typeId,
    activityId,
    title,
    description,
    countryId,
    cityId
  }
};

export default createResponse;