<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/changelog">ChangeLog</RouterLink>
  </nav>

  <RouterView />
</template>

<style>
  RouterLink {
    margin-right: 20px;
  }
</style>