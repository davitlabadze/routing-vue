import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamFooter from './pages/TeamFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/teams' },
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
    if(to.meta.needsAuth){
      console.log('Needs auth!');
      // next();
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

  export default router;