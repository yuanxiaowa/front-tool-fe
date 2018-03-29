import Container from '@/components/ContainerWithMenu'
import List from './List'
import Add from './Add'

export default {
  path: '/devserver',
  component: Container,
  props: {
    menus: [
      { title: '列表', icon: 'dashboard', link: '/devserver' },
      { title: '添加', icon: 'add', link: '/devserver/add' }
    ]
  },
  children: [{
    name: 'devserver-list',
    path: '',
    component: List
  }, {
    name: 'devserver-add',
    path: 'add',
    component: Add
  }]
}
