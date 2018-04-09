import Container from '@/components/Container'
const Home = () => import(/* webpackChunkName: "project" */'./Home')
const Add = () => import(/* webpackChunkName: "project" */'./Add')
const Projects = () => import(/* webpackChunkName: "project" */'./Projects')

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
