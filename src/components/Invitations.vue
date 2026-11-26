<script setup>
defineProps({ invitations: { type: Array, default: () => [] } })
defineEmits(['accept', 'reject', 'details'])
</script>
<template>
  <section class="side-panel invitations-panel">
    <div class="panel-title-row"><h3>Активные приглашения</h3><span class="count-badge">{{ invitations.filter(x => x.status === 'pending').length }}</span></div>
    <div v-if="!invitations.length" class="empty-state">Пока нет активных приглашений</div>
    <article v-for="invite in invitations" :key="invite.id" class="invitation-item">
      <h4>{{ invite.title }}</h4>
      <div class="invitation-meta"><span>{{ invite.time }}</span><span>{{ invite.person }}</span><span>{{ invite.category }}</span></div>
      <div v-if="invite.status === 'pending'" class="invitation-actions">
        <button class="btn btn-primary btn-small" @click="$emit('accept', invite.id)">Принять</button>
        <button class="btn btn-light btn-small" @click="$emit('details', invite)">Подробнее</button>
        <button class="btn btn-light btn-small" @click="$emit('reject', invite.id)">Отклонить</button>
      </div>
      <div v-else class="status-line" :class="invite.status">{{ invite.status === 'accepted' ? 'Приглашение принято' : 'Приглашение отклонено' }}</div>
    </article>
  </section>
</template>
