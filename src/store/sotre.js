import { defineStore } from 'pinia'
import user from './module/user'
const userStore = defineStore('userStore', user)

export {
  userStore
}
