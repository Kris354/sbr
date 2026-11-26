<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const items = [
  { label: 'Аппаратура', to: '/equipment', icon: '▣' },
  { label: 'Люди', to: '/people', icon: '♙' },
  { label: 'Пространство', to: '/spaces', icon: '⌂' },
  { label: 'Профиль', to: '/profile', icon: '◉' },
]
</script>
<template>
  <nav class="main-nav">
    <RouterLink class="nav-brand" to="/" aria-label="СБР — главная"><span class="brand-mark">↗</span></RouterLink>
    <div class="nav-links">
      <RouterLink v-for="item in items" :key="item.to" :to="item.to" :class="['nav-link', { active: route.path === item.to }]">
        <span class="nav-icon">{{ item.icon }}</span>{{ item.label }}
      </RouterLink>
    </div>
    <RouterLink to="/profile" class="nav-user" title="Профиль"><span class="user-avatar">ИИ</span></RouterLink>
  </nav>
</template>
