import request from '@/utils/request'

type GetProductProps = {
  categoryId?: number
  productId?: number,
  searchKeyWord?: string
}

export function getProduct(params: GetProductProps = {}) {
  return request({
    url: '/product',
    method: 'get',
    params,
  })
}

export function getCategory() {
  return request({
    url: '/category',
    method: 'get',
  })
}
