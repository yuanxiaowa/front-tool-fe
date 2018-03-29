import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index'
import SvnRoute from '../pages/svn'
import ShellRoute from '../pages/shell'
import InterfaceRoute from '../pages/interface'
import DevServer from '../pages/devserver'
import Project from '../pages/project'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/menu',
    name: 'Index',
    component: Index
  }, SvnRoute, ShellRoute, InterfaceRoute, DevServer, Project]
})
