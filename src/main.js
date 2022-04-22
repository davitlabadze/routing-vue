import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamFooter from './components/teams/TeamFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirec: '/teams' },
    { 
      name: 'teams',
      path: '/teams', 
      meta: { needsAuth: true },
      components: { default: TeamsList, footer: TeamFooter }, 
      children: [
          { name:'team-members', path: ':teamId', component: TeamMembers, props: true },
      ] 
    } , // our-domain.com/teams => TeamsList
    { path: '/users', 
      components:{ 
        default: UsersList,
        footer: UsersFooter
       },
       beforeEnter(to,from,next){
         console.log('Users beforeEnter');
         console.log(to,from);
         next();
       }
  
    },
    // { path: '/:notFound(.*)',redirect: '/teams' }
    { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition){
    if(savedPosition){
      return savedPosition;
    }
    return { left:0, top:0 };
  }
});

router.beforeEach(function(to,from,next){
  console.log('Global beforeEach');
  console.log(to, from);
  if(to.meta.neetsAuth){
    console.log('Needs auth!');
    next();
  }else{
    next();
  }
  // if(to.name === 'team-members') {
  //   next();
  // }else{
  //   next({name: 'team-members', params: {teamId: 't2'}});
  // }
  next();

});

router.afterEach(function(to,from) {
  // sending analytics data
  console.log('Global afterEach')
  console.log(to,from);

});

const app = createApp(App);

app.use(router);

app.mount('#app');
