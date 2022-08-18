import request from '@/utils/request'

// 查询原神角色信息列表
export function listRoleinfo(query) {
  return request({
    url: '/system/roleinfo/list',
    method: 'get',
    params: query
  })
}

// 查询原神角色信息详细
export function getRoleinfo(id) {
  return request({
    url: '/system/roleinfo/' + id,
    method: 'get'
  })
}

// 新增原神角色信息
export function addRoleinfo(data) {
  return request({
    url: '/system/roleinfo',
    method: 'post',
    data: data
  })
}

// 修改原神角色信息
export function updateRoleinfo(data) {
  return request({
    url: '/system/roleinfo',
    method: 'put',
    data: data
  })
}

// 删除原神角色信息
export function delRoleinfo(id) {
  return request({
    url: '/system/roleinfo/' + id,
    method: 'delete'
  })
}
