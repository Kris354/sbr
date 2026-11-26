<script setup>
defineProps({ resource: { type: Object, required: true } })
defineEmits(['invite', 'details'])
</script>
<template>
  <article class="resource-card">
    <div class="resource-photo-wrap">
      <img class="resource-photo" :src="resource.image" :alt="resource.name" loading="lazy" />
      <span class="photo-tag">{{ resource.category }}</span>
    </div>
    <div class="resource-info">
      <h3>{{ resource.name }}</h3>
      <p>{{ resource.description }}</p>
      <div class="resource-actions">
        <button class="btn btn-primary btn-small" @click="$emit('invite', resource)">Пригласить</button>
        <button class="btn btn-light btn-small" @click="$emit('details', resource)">Подробнее</button>
      </div>
    </div>
  </article>
</template>
