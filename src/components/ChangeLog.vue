<template>
  <div id="change-log">
    <h2>更新日志</h2>
    <ul>
      <li v-for="log in logs" :key="log.ver">
        <strong>{{ log.ver }}</strong>
        by {{ log.author }} at {{ log.mtime }}
        <br>
        {{ log.info }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { NowTimeStr } from '@/util';
import { ref } from 'vue'


const logs = [
  {
    ver: 'v0.0.2',
    info: `add ChangeLog component`,
    mtime: '2022-07-17 16:37:28',
    author: 'windqiu',
  },
  {
    ver: 'v0.0.1',
    info: `init project`,
    mtime: '2022-07-17 16:35:00',
    author: 'windqiu',
  },
]
</script>