<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
function submit() { if (!name.value.trim() || !email.value || password.value.length < 4) { error.value = 'Заполните поля. Пароль должен содержать не менее 4 символов.'; return } localStorage.setItem('sbr-user', name.value); localStorage.setItem('sbr-email', email.value); location.href = '/' }
</script>
<template><main class="auth-page"><RouterLink to="/" class="auth-back">← На главную</RouterLink><form class="auth-card" @submit.prevent="submit"><span class="brand-mark auth-mark">↗</span><span class="eyebrow">СЕРВИС БРОНИРОВАНИЯ РЕСУРСОВ</span><h1>Создать аккаунт</h1><p>Зарегистрируйтесь, чтобы бронировать общие ресурсы.</p><label>Имя и фамилия<input v-model="name" placeholder="Иван Иванов"></label><label>Электронная почта<input v-model="email" type="email" placeholder="name@example.com"></label><label>Пароль<input v-model="password" type="password" placeholder="Не менее 4 символов"></label><p v-if="error" class="form-error">{{ error }}</p><button class="btn btn-primary auth-submit">Зарегистрироваться</button><div class="auth-switch">Уже есть аккаунт? <RouterLink to="/login">Войти</RouterLink></div></form></main></template>
