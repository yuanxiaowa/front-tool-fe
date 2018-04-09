import Container from '@/components/ContainerWithMenu'
const List = () => import(/* webpackChunkName: "shell" */'./List')
const Detail = () => import(/* webpackChunkName: "shell" */'./Detail')
const Add = () => import(/* webpackChunkName: "shell" */'./Add')

export default {
  path: '/shell',
  component: Container,
  props: {
    menus: [
      { title: '账号列表', icon: 'dashboard', link: '/shell' },
      { title: '添加账号', icon: 'add', link: '/shell/add' }
    ]
  },
  children: [
    {
      name: 'shell-list',
      path: '',
      component: List
    },
    {
      name: 'shell-add',
      path: 'add',
      component: Add
    },
    {
      name: 'shell-terminal',
      path: ':id',
      component: Detail
    }
  ]
}
