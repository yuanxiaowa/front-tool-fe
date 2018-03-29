import Container from '@/components/ContainerWithMenu'
import Action from './Action'
import Add from './Add'
export default {
  path: '/svn',
  component: Container,
  props: {
    menus: [
      { title: '通用', icon: 'dashboard', link: '/svn' },
      { title: '添加', icon: 'add', link: '/svn/add' }
    ]
  },
  children: [
    {
      name: 'action',
      path: '',
      component: Action
    }, {
      name: 'add',
      path: 'add',
      component: Add
    }
  ]
}
