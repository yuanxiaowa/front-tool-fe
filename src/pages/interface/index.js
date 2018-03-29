import Container from '@/components/Container'
import List from './List'
import Edit from './Edit'
import Preview from './Preview'
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
