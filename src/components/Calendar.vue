<script setup>
import { computed, ref } from 'vue'
const monthDate = ref(new Date(2023, 11, 1))
const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
const weekDays = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
const selected = ref(new Date().getDate())
const monthTitle = computed(() => `${monthNames[monthDate.value.getMonth()]} ${monthDate.value.getFullYear()}`)
const cells = computed(() => {
  const y = monthDate.value.getFullYear(), m = monthDate.value.getMonth()
  const first = new Date(y, m, 1)
  const offset = (first.getDay() + 6) % 7
  const count = new Date(y, m + 1, 0).getDate()
  const prevCount = new Date(y, m, 0).getDate()
  return Array.from({ length: 42 }, (_, i) => {
    const day = i - offset + 1
    if (day < 1) return { day: prevCount + day, outside: true, key: `p${i}` }
    if (day > count) return { day: day - count, outside: true, key: `n${i}` }
    return { day, outside: false, key: `c${i}` }
  })
})
function shiftMonth(delta) { monthDate.value = new Date(monthDate.value.getFullYear(), monthDate.value.getMonth() + delta, 1) }
</script>
<template>
  <section class="side-panel calendar-panel">
    <div class="calendar-heading"><h3>{{ monthTitle }}</h3><div class="month-controls"><button @click="shiftMonth(-1)" aria-label="Предыдущий месяц">‹</button><button @click="shiftMonth(1)" aria-label="Следующий месяц">›</button></div></div>
    <div class="calendar-grid calendar-weekdays"><span v-for="day in weekDays" :key="day">{{ day }}</span></div>
    <div class="calendar-grid calendar-days">
      <button v-for="cell in cells" :key="cell.key" :class="['calendar-day', { outside: cell.outside, selected: !cell.outside && selected === cell.day, weekend: !cell.outside && ((new Date(monthDate.getFullYear(), monthDate.getMonth(), cell.day).getDay() === 0) || (new Date(monthDate.getFullYear(), monthDate.getMonth(), cell.day).getDay() === 6)) }]" @click="!cell.outside && (selected = cell.day)">{{ cell.day }}</button>
    </div>
  </section>
</template>
