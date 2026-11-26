import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import EquipmentView from '../views/EquipmentView.vue'
import PeopleView from '../views/PeopleView.vue'
import SpacesView from '../views/SpacesView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/equipment', name: 'equipment', component: EquipmentView },
  { path: '/people', name: 'people', component: PeopleView },
  { path: '/spaces', name: 'spaces', component: SpacesView },
  { path: '/profile', name: 'profile', component: ProfileView },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
