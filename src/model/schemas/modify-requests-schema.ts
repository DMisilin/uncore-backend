import {
  typeId,
  activityId,
  countryId,
  cityId,
  status,
  createDttm,
} from './proprties';

const modifyRequests = {
  type: 'object',
  required: ['requestId'],
  properties: {
    typeId,
    activityId,
    countryId,
    cityId,
    status,
    createDttm,
  }
};

export default modifyRequests;