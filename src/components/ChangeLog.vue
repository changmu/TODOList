<template>
  <div id="change-log">
    <h2>更新日志</h2>
    <ul>
      <li v-for="{html_url, sha, author, commit} in commits" :key="sha">
        <a :href="html_url" target="_blank" class="commit">{{sha.slice(0, 7)}}</a>
        - <span class="message">{{truncate(commit.message)}}</span><br>
        by <span class="author">
          <a :href="author.html_url" target="_blank">{{commit.author.name}}</a>
        </span>
        at <span class="date">{{formatDate(commit.author.date)}}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
// import { NowTimeStr } from '@/util';
import { onMounted, ref } from 'vue'

const commits = ref(null)

// TODO 分页功能
// const API_URL = `https://api.github.com/repos/changmu/TODOList/commits?per_page=10&sha=main`
const API_URL = `https://api.github.com/repos/changmu/TODOList/commits?sha=main`

// 取数据
onMounted(async () => {
  commits.value = await (await fetch(API_URL)).json()
  console.log('commits.value:', commits.value);
})

function truncate(v) {
  const newLine = v.indexOf('\n')
  return newLine > 0 ? v.slice(0, newLine) : v
}

function formatDate(v) {
  return v.replace(/T|Z/g, ' ')
}

</script>