import Container from '@/components/Container'
import Home from './Home'
import Add from './Add'
import Projects from './Projects'

export default {
  path: '/project',
  component: Container,
  children: [{
    path: '',
    component: Home
  }, {
    path: 'add',
    component: Add
  }, {
    path: 'projects',
    component: Projects
  }]
}
