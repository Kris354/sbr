<script setup>
import { ref } from 'vue'
const email = ref(localStorage.getItem('sbr-email') || '')
const password = ref('')
const error = ref('')
function submit() { if (!email.value || !password.value) { error.value = 'Заполните все поля'; return } localStorage.setItem('sbr-email', email.value); localStorage.setItem('sbr-user', email.value.split('@')[0] || 'Пользователь'); location.href = '/' }
</script>
<template><main class="auth-page"><RouterLink to="/" class="auth-back">← На главную</RouterLink><form class="auth-card" @submit.prevent="submit"><span class="brand-mark auth-mark">↗</span><span class="eyebrow">СЕРВИС БРОНИРОВАНИЯ РЕСУРСОВ</span><h1>С возвращением!</h1><p>Войдите в свой аккаунт, чтобы продолжить.</p><label>Электронная почта<input v-model="email" type="email" placeholder="name@example.com"></label><label>Пароль<input v-model="password" type="password" placeholder="Введите пароль"></label><p v-if="error" class="form-error">{{ error }}</p><button class="btn btn-primary auth-submit">Войти</button><div class="auth-switch">Нет аккаунта? <RouterLink to="/register">Зарегистрироваться</RouterLink></div></form></main></template>
