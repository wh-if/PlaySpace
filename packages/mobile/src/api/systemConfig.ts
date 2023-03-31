import request from "@/utils/request";

export function getBannerList() {
  return request({
    url: '/banner',
    method: 'get',
  })
}