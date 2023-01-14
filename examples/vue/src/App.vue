<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <main class="box">
    <nav class="nav">
      <RouterLink to="/Home"> Home </RouterLink>
      <RouterLink to="/Home/detaile"> detaile </RouterLink>
    </nav>
    <div class="main">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1500px;
}
.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

nav a {
  margin: 1rem 0;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
