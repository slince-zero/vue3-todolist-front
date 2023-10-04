<template>
  <div class="todo">
    <div class="content">
      <table>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>age</th>
          <th>address</th>
          <th>action</th>
        </tr>
        <tr v-for="todo in todoData" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.name }}</td>
          <td>{{ todo.age }}</td>
          <td>{{ todo.address }}</td>
          <td>
            <button @click="todoDel(todo)">删除</button>
            <button @click="todoEdit(todo)">修改</button>
          </td>
        </tr>
      </table>
      <div>
        name:
        <input v-model="tempData.name" type="text" />
        age:
        <input v-model="tempData.age" type="text" />
        address:
        <input v-model="tempData.address" type="text" />
        <button @click="todoAddOrEdit(tempData)">
          {{ editFlag ? '提交' : '添加' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    getAllData,
    deleteOneData,
    addOneData,
    updateOneData,
  } from './api/index.js'
  import { ref, onMounted } from 'vue'
  const todoData = ref([])

  // 获取所有数据
  const getData = async () => {
    const res = await await getAllData()
    const { data } = res
    todoData.value = data
    // console.log(todoData.value)
  }
  onMounted(() => {
    getData()
  })

  // 删除一条数据
  const todoDel = async (todo) => {
    const res = await deleteOneData(todo.id)
    getData()
    // console.log(res)
  }

  // 添加一条数据
  const formData = ref({
    name: '',
    age: '',
    address: '',
  })
  const tempData = ref({
    name: '',
    age: '',
    address: '',
  })
  const todoAddOrEdit = async (tempData) => {
    if (editFlag.value) {
      // 修改
      const res = await updateOneData(tempData)
      getData()
    } else {
      // 添加
      const res = await addOneData(tempData)
      getData()
      // console.log(res)
    }
    tempData.value = {} // 清空临时数据
  }

  // 修改一条数据
  let editFlag = ref(false) // 用于判断是否要修改
  const todoEdit = async (todo) => {
    editFlag.value = true
    tempData.value = { ...todo } // 使用临时数据存储修改前的数据
  }
</script>
