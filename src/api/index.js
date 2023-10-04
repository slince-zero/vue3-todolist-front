import request from '../utils/request'

// 获取所有数据
export const getAllData = () => {
  return request({
    url: '/todo',
    method: 'get',
  })
}

// 删除一条数据
export const deleteOneData = (id) => {
  return request({
    url: `/todo/${id}`,
    method: 'delete',
  })
}

// 添加一条数据
export const addOneData = (data) => {
  return request({
    url: '/todo',
    method: 'post',
    data,
  })
}

// 更新一条数据
export const updateOneData = (id, data) => {
  return request({
    url: `/todo/${id}`,
    method: 'put',
    data,
  })
}

// 查找数据
export const findData = (id) => {
  return request({
    url: `/todo/${id}`,
    method: 'get',
  })
}
