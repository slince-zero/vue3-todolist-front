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
        <input v-model="formData.name" type="text" />
        age:
        <input v-model="formData.age" type="text" />
        address:
        <input v-model="formData.address" type="text" />
        <button @click="todoAddOrEdit(formData)">
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
    findData,
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
  // 临时存储
  const tempData = ref({
    name: '',
    age: '',
    address: '',
  })
  const todoAddOrEdit = async (form) => {
    if (editFlag.value) {
      // 修改
      tempData.value = { ...form }
      console.log(JSON.stringify(tempData.value))
      const res = await updateOneData(
        tempData.value.id,
        JSON.stringify(tempData.value),
      )
      getData()
      formData.value = {}
      editFlag.value = false
      // console.log(res)
    } else {
      // 添加
      const res = await addOneData(form)
      getData()
      formData.value = {}
      // console.log(res)
    }
  }

  // 修改一条数据
  let editFlag = ref(false) // 用于判断是否要修改
  const todoEdit = async (todo) => {
    editFlag.value = true
    formData.value = todo
  }
</script>

<style>
  .todo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }
  .content {
    display: flex;
    flex-direction: column;
  }
  table {
    width: 300px;
    height: 300px;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid;
    text-align: center;
  }
</style>
