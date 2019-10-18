import request from '../utils/request';

export function login(params) {
  console.log('params',params)
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  })
}
