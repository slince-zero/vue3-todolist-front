<template>
  <div class="todo">
    <div class="content">
      <div>
        <input type="text" v-model="newTodo" />
        <button @click="addTodo">添加</button>
        <button @click="searchTodo">查询</button>
      </div>

      <div>
        <ul>
          <li v-for="todo in todoData">
            <label style="margin-right: 5px">{{ todo }}</label>
            <button @click="todoDel(todo)">删除</button>
            <button @click="todoEdit(todo)">编辑</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

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
</style>
