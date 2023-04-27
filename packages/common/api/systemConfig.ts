import request from ".";

export function getBannerList() {
  return request({
    url: '/banner',
    method: 'get',
  })
}