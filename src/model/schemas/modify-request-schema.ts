import {
  requestId,
  typeId,
  activityId,
  countryId,
  cityId,
  status,
  createDttm,
} from './proprties';

const modifyRequest = {
  type: 'object',
  required: ['requestId'],
  properties: {
    requestId,
    typeId,
    activityId,
    countryId,
    cityId,
    status,
    createDttm,
  }
};

export default modifyRequest;