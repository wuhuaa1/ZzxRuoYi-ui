import request from '@/utils/request'

// 查询原神伤害计算列表
export function listHurt(query) {
  return request({
    url: '/system/hurt/list',
    method: 'get',
    params: query
  })
}

// 查询原神伤害计算详细
export function getHurt(id) {
  return request({
    url: '/system/hurt/' + id,
    method: 'get'
  })
}

// 新增原神伤害计算
export function addHurt(data) {
  return request({
    url: '/system/hurt',
    method: 'post',
    data: data
  })
}

// 修改原神伤害计算
export function updateHurt(data) {
  return request({
    url: '/system/hurt',
    method: 'put',
    data: data
  })
}

// 删除原神伤害计算
export function delHurt(id) {
  return request({
    url: '/system/hurt/' + id,
    method: 'delete'
  })
}
