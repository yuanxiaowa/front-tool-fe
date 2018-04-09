import Container from '@/components/Container'
const List = () => import(/* webpackChunkName: "interface" */'./List')
const Edit = () => import(/* webpackChunkName: "interface" */'./Edit')
const Preview = () => import(/* webpackChunkName: "interface" */'./Preview')
export default {
  path: '/interface',
  component: Container,
  children: [{
    name: 'list',
    path: '',
    component: List
  }, {
    name: 'edit',
    path: 'edit/:id',
    component: Edit
  }, {
    name: 'preview',
    path: 'preview/:id',
    component: Preview
  }]
}
