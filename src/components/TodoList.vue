<template>
  <h1 class="header">TODOs</h1>
  <input id="text-input" type="text" placeholder="what needs to be done" ref="input" v-model.trim="inputTitle"
    @keydown.enter="handleTextInput">
  <br>
  <div class="todo-item" v-for="todo in todos" :key="todo.id">
    <input type="checkbox" v-model="todo.done" @click="clickDone($event, todo)">
    <span :class="{ done: todo.done }">{{ todo.title }}</span>
    <button class="delButton" @click="delItem(todo)">x</button>
  </div>
  <div class="footer">
    <span v-if="todos.length === 0">暂无任务，请输入待办事项</span>
    <span v-else>{{ toBeDoneCount }}个任务待完成</span>
    <br>

    <span>过滤状态：</span>
    <select name="state" v-model="selected">
      <!-- <option disabled value="">Please select one</option> -->
      <option>所有</option>
      <option>待完成</option>
      <option>已完成</option>
    </select>
    <br>

    <button @click="removeDone">移除已完成</button>
    <br>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import { NowUnix, NowTimeStr } from '@/util'

const KEY_STORAGE = 'todos'

// 载入缓存数据
const todos = ref(JSON.parse(localStorage.getItem(KEY_STORAGE)) || [])
let cachedTODOs = todos.value
const inputTitle = ref()
const selected = ref('所有')
const input = ref(null)

// 持久化数据
const save = () => {
  const data = JSON.stringify(todos.value)
  localStorage.setItem(KEY_STORAGE, data)
  cachedTODOs = todos.value
}

// 将输入的数据写入model
const handleTextInput = () => {
  if (inputTitle.value == '') {
    return
  }
  todos.value.unshift({
    title: inputTitle.value,
    id: NowUnix(),
    done: false,
    ctime: NowUnix(),
  })
  inputTitle.value = ''
  save()
}
const filters = {
  notDone: () => todos.value.filter(todo => !todo.done),
  done: () => todos.value.filter(todo => todo.done),
}
// 移除已完成任务
const removeDone = () => {
  selected.value = "所有" // 先切换到所有列表，再删除，避免数据丢失
  todos.value = cachedTODOs
  todos.value = filters.notDone()
  save()
}
// 删除指定任务
const delItem = (todo) => {
  todos.value = todos.value.filter(item => item != todo)
  save()
}

// 观察数据变化
const clickDone = (e, todo) => {
  todo.done = !todo.done
  save()
}

// 观察选中的状态
watch(selected, (newValue) => {
  if (newValue === '所有') {
    todos.value = cachedTODOs
  } else if (newValue === '待完成') {
    todos.value = cachedTODOs.filter(todo => !todo.done)
  } else if (newValue === '已完成') {
    todos.value = cachedTODOs.filter(todo => todo.done)
  }
})

// 计算已完成任务数
const doneCount = computed(() => {
  return todos.value.reduce((total, todo) => {
    return total + (todo.done ? 1 : 0)
  }, 0)
})
// 计算未完成任务数
const toBeDoneCount = computed(() => {
  return todos.value.reduce((total, todo) => {
    return total + (todo.done ? 0 : 1)
  }, 0)
})

// 挂载后焦点给input
onMounted(() => {
  nextTick(() => {
    input.value.focus()
  })
})


</script>

<style>
.done {
  text-decoration: line-through;
}

.delButton {
  margin-left: 10px;
  display: none;
}

.todo-item:hover {
  background-color: chartreuse;
}

.todo-item:hover .delButton {
  display: inline;
}
</style>