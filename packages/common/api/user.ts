import request from '.'

export function login(data: Record<string, any>) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export default function hello(str: number) {
  console.log("hello common..." + str)
}

export function register(data: Record<string, any>) {
  return request({
    url: '/register',
    method: 'post',
    data,
  })
}

export interface Address {
  id?: string
  userId?: string
  receiverName: string
  receiverPhone: string
  position: string
  detailAddress: string
  isDefault: boolean
}

export function getAddress() {

  return request({
    url: '/address',
    method: 'get',
    params: { userId: '1' },
  })
}

export function addAddress(data: Address) {
  return request({
    url: '/address',
    method: 'post',
    data: { userId: 1, ...data },
  })
}

export function updateAddress(data: Address) {
  return request({
    url: `/address/${data.id}`,
    method: 'put',
    data,
  })
}

export function deleteAddress(id: string) {
  return request({
    url: `/address/${id}`,
    method: 'delete',
  })
}
