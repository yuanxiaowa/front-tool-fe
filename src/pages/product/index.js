import Container from '@/components/Container'
const Home = () => import(/* webpackChunkName: "project" */'./Home')
const Browser = () => import('./Browser')

export default {
  path: '/product',
  component: Container,
  children: [{
    path: '',
    component: Home
  }, {
    path: 'browser',
    component: Browser
  }]
}
