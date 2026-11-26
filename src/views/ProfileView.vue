<script setup>
import { computed, ref } from 'vue'
const user = ref(localStorage.getItem('sbr-user') || 'Иван Иванов')
const email = ref(localStorage.getItem('sbr-email') || 'example@yandex.ru')
const editing = ref(false)
const saved = ref(false)
const initials = computed(() => user.value.split(' ').map(x => x[0]).slice(0,2).join('').toUpperCase())
function save() { localStorage.setItem('sbr-user', user.value); localStorage.setItem('sbr-email', email.value); editing.value = false; saved.value = true; setTimeout(() => saved.value = false, 2500) }
function logout() { localStorage.removeItem('sbr-user'); localStorage.removeItem('sbr-email'); location.href = '/' }
</script>
<template><main class="profile-page"><header class="profile-top"><RouterLink to="/" class="inner-logo"><span class="brand-mark">↗</span><b>СБР</b></RouterLink><RouterLink to="/" class="btn btn-light">На главную</RouterLink></header><section class="profile-card"><div class="profile-avatar">{{ initials }}</div><span class="eyebrow">ЛИЧНЫЙ КАБИНЕТ</span><h1>Профиль пользователя</h1><template v-if="editing"><label>Имя и фамилия<input v-model="user"></label><label>Электронная почта<input v-model="email" type="email"></label><button class="btn btn-primary profile-action" @click="save">Сохранить</button></template><template v-else><h2>{{ user }}</h2><p>{{ email }}</p><button class="btn btn-primary profile-action" @click="editing = true">Редактировать профиль</button></template><p v-if="saved" class="success-note">Изменения сохранены</p><button class="logout-button" @click="logout">Выйти из аккаунта</button></section></main></template>
