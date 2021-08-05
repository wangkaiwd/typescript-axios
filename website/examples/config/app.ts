import qs from 'qs';
import axios, { AxiosTransformer } from '../../../lib';
import defaults from '../../../lib/default';

axios
  .post(
    '/config/post',
    { x: 1 },
    { headers: { b: 3, c: 4, common: { d: 5, a: { x: 2, y: 3 } } } }
  )
  .then((res) => {
    console.log('res', res);
  });

const transformRequest = [
  function (data: any) {
    return qs.stringify(data);
  },
  ...(defaults.transformRequest as AxiosTransformer[])
];

const transformResponse = [
  ...(defaults.transformResponse as AxiosTransformer[]),
  function (data: any) {
    if (typeof data === 'object') {
      data.b = 2;
    }
    return data;
  }
];
axios({
  url: '/config/post',
  data: { a: 1, b: 2 },
  method: 'post',
  transformRequest,
  transformResponse
}).then((res) => {
  console.log('res1', res);
});