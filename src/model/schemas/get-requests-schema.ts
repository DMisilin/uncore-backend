import {
  userId,
  typeId,
  activityId,
  countryId,
  cityId,
  status,
  createDttm,
} from './proprties';

const getRequests = {
  type: 'object',
  required: [],
  properties: {
    userId,
    typeId,
    activityId,
    countryId,
    cityId,
    status,
    createDttm,
  }
};

export default getRequests;