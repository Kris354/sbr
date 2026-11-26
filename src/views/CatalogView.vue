<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { demoResources } from '../data'
import Navigation from '../components/Navigation.vue'
import ResourceCard from '../components/ResourceCard.vue'
const route = useRoute()
const map = { equipment: 'equipment', people: 'people', spaces: 'spaces' }
const titles = { equipment: 'Аппаратура', people: 'Люди', spaces: 'Пространство' }
const type = computed(() => map[route.name] || 'equipment')
const title = computed(() => titles[type.value])
const query = ref('')
const list = computed(() => demoResources.filter(x => x.type === type.value && `${x.name} ${x.description}`.toLowerCase().includes(query.value.toLowerCase())))
const toast = ref('')
function message(text) { toast.value = text; setTimeout(() => toast.value = '', 2500) }
</script>
<template>
  <div class="inner-page"><header class="inner-header"><RouterLink to="/" class="inner-logo"><span class="brand-mark">↗</span><b>СБР</b></RouterLink><Navigation /></header><main class="inner-content"><div class="inner-title"><div><span class="eyebrow">КАТАЛОГ РЕСУРСОВ</span><h1>{{ title }}</h1><p>Выберите подходящий ресурс и отправьте приглашение на бронирование.</p></div><RouterLink to="/" class="btn btn-light">На главную</RouterLink></div><label class="search-box inner-search"><span>⌕</span><input v-model="query" placeholder="Поиск по каталогу"></label><div v-if="list.length" class="resource-grid"><ResourceCard v-for="item in list" :key="item.id" :resource="item" @invite="message(`Приглашение для «${$event.name}» создано`)" @details="message($event.description)" /></div><div v-else class="empty-catalog"><h3>Ничего не найдено</h3></div></main><div v-if="toast" class="toast-message">{{ toast }}</div></div>
</template>
