<script setup>
import { computed, ref } from 'vue'
import { demoResources, initialInvitations } from '../data'
import Navigation from '../components/Navigation.vue'
import ResourceCard from '../components/ResourceCard.vue'
import Calendar from '../components/Calendar.vue'
import Invitations from '../components/Invitations.vue'

const activeType = ref('people')
const search = ref('')
const sort = ref('default')
const showAdd = ref(false)
const modal = ref(null)
const toast = ref('')
const resources = ref(JSON.parse(localStorage.getItem('sbr-resources') || 'null') || demoResources)
const invitations = ref(JSON.parse(localStorage.getItem('sbr-invitations') || 'null') || initialInvitations)
const newResource = ref({ name: '', category: '', description: '', type: 'equipment', image: '' })
const typeTitle = computed(() => ({ people: 'Люди', equipment: 'Аппаратура', spaces: 'Пространство' })[activeType.value])
const filtered = computed(() => {
  let list = resources.value.filter(r => r.type === activeType.value && `${r.name} ${r.description} ${r.category}`.toLowerCase().includes(search.value.toLowerCase()))
  if (sort.value === 'az') list = [...list].sort((a,b) => a.name.localeCompare(b.name, 'ru'))
  if (sort.value === 'za') list = [...list].sort((a,b) => b.name.localeCompare(a.name, 'ru'))
  return list
})
function persist() { localStorage.setItem('sbr-resources', JSON.stringify(resources.value)); localStorage.setItem('sbr-invitations', JSON.stringify(invitations.value)) }
function notify(message) { toast.value = message; setTimeout(() => { toast.value = '' }, 2800) }
function invite(resource) {
  const today = new Date().toISOString().slice(0,10)
  const conflict = invitations.value.some(i => i.date === today && i.status === 'accepted' && i.resourceId === resource.id && i.time === '10:00 – 12:00')
  if (conflict) return notify('Это время уже занято. Выберите другой интервал.')
  invitations.value.unshift({ id: Date.now(), title: `Бронирование: ${resource.name}`, time: '10:00 – 12:00', person: 'Иван Иванов', category: resource.category, date: today, status: 'pending', resourceId: resource.id })
  persist(); notify('Приглашение создано!')
}
function changeStatus(id, status) { const item = invitations.value.find(i => i.id === id); if (!item) return; if (status === 'accepted') { const conflict = invitations.value.some(i => i.id !== id && i.status === 'accepted' && i.date === item.date && i.time === item.time && i.resourceId === item.resourceId); if (conflict) return notify('Конфликт бронирования: ресурс уже занят в это время.') } item.status = status; persist(); notify(status === 'accepted' ? 'Бронирование подтверждено' : 'Приглашение отклонено') }
function addResource() {
  if (!newResource.value.name.trim() || !newResource.value.category.trim()) return notify('Укажите название и категорию ресурса')
  resources.value.unshift({ ...newResource.value, id: Date.now(), image: newResource.value.image || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop&q=85' })
  persist(); newResource.value = { name: '', category: '', description: '', type: activeType.value, image: '' }; showAdd.value = false; notify('Ресурс добавлен')
}
function showDetails(item) { modal.value = item }
</script>
<template>
  <main>
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-brand"><span class="hero-logo">✎</span><span class="hero-acronym">СБР</span><span class="hero-subtitle">Сервис бронирования<br>ресурсов</span></div>
        <div class="hero-auth"><RouterLink class="btn btn-white" to="/login">Вход</RouterLink><RouterLink class="btn btn-white" to="/register">Регистрация</RouterLink></div>
        <p class="hero-description">Рыбатекст используется дизайнерами, проектировщиками и фронтендерами,<br class="desktop-only"> когда нужно быстро заполнить макеты или прототипы содержимым. Это<br class="desktop-only"> тестовый контент, который не должен нести никакого смысла, лишь показать<br class="desktop-only"> наличие самого текста или продемонстрировать типографику в деле.</p>
      </div>
    </section>
    <Navigation />
    <section class="workspace">
      <div class="catalog-column">
        <div class="catalog-toolbar">
          <label class="search-box"><span>⌕</span><input v-model="search" placeholder="Поиск" aria-label="Поиск ресурсов"><button v-if="search" @click="search = ''" aria-label="Очистить">×</button></label>
          <label class="sort-box"><span>F</span><select v-model="sort" aria-label="Сортировка"><option value="default">По умолчанию</option><option value="az">По алфавиту</option><option value="za">По алфавиту (Я–А)</option></select></label>
          <button class="btn btn-add" @click="showAdd = true">Добавить <span>＋</span></button>
        </div>
        <div class="section-heading"><div><span class="eyebrow">КАТАЛОГ РЕСУРСОВ</span><h1>{{ typeTitle }}</h1></div><span class="results-count">{{ filtered.length }} ресурсов</span></div>
        <div v-if="filtered.length" class="resource-grid">
          <ResourceCard v-for="resource in filtered" :key="resource.id" :resource="resource" @invite="invite" @details="showDetails" />
        </div>
        <div v-else class="empty-catalog"><span>⌕</span><h3>Ничего не найдено</h3><p>Попробуйте изменить поисковый запрос или выбрать другой раздел.</p></div>
      </div>
      <aside class="sidebar-column"><Calendar /><Invitations :invitations="invitations" @accept="changeStatus($event, 'accepted')" @reject="changeStatus($event, 'rejected')" @details="showDetails" /></aside>
    </section>
    <div v-if="showAdd" class="modal-backdrop" @click.self="showAdd = false"><form class="modal-card" @submit.prevent="addResource"><button type="button" class="modal-close" @click="showAdd = false">×</button><span class="eyebrow">НОВАЯ ЗАПИСЬ</span><h2>Добавить ресурс</h2><label>Название<input v-model="newResource.name" required placeholder="Например, Проектор Epson"></label><label>Категория<input v-model="newResource.category" required placeholder="Оборудование"></label><label>Раздел<select v-model="newResource.type"><option value="equipment">Аппаратура</option><option value="people">Люди</option><option value="spaces">Пространство</option></select></label><label>Описание<textarea v-model="newResource.description" rows="3" placeholder="Краткое описание ресурса"></textarea></label><label>Ссылка на фотографию<input v-model="newResource.image" placeholder="https://..."></label><button class="btn btn-primary modal-submit">Сохранить ресурс</button></form></div>
    <div v-if="modal" class="modal-backdrop" @click.self="modal = null"><div class="modal-card detail-modal"><button class="modal-close" @click="modal = null">×</button><img v-if="modal.image" :src="modal.image" :alt="modal.name" class="detail-image"><span class="eyebrow">{{ modal.category }}</span><h2>{{ modal.name || modal.title }}</h2><p>{{ modal.description || `Время: ${modal.time}. Участник: ${modal.person}.` }}</p><button class="btn btn-primary modal-submit" @click="modal = null">Закрыть</button></div></div>
    <transition name="toast"><div v-if="toast" class="toast-message">{{ toast }}</div></transition>
    <footer class="site-footer"><span>СБР · Сервис бронирования ресурсов</span><span>Удобное управление общими ресурсами</span></footer>
  </main>
</template>
