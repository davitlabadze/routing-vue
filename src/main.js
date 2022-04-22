import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamMembers.vue';
import UserList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue'


const router = createRouter({
    history: createWebHistory(),
    routes : [
        {path: '/teams' ,component:TeamsList},
        {path: '/users' ,component:UserList},
        {path: '/teams/:teamId', component:TeamMembers},   
    ],
    linkActiveClass: 'active'
});

const app = createApp(App)

app.use(router);

app.mount('#app');
