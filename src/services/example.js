/* eslint-disable linebreak-style */

import request from '../utils/request';

export function query() {
  return request('/api/users');
}
