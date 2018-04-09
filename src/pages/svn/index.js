import Container from '@/components/ContainerWithMenu'
const Action = () => import(/* webpackChunkName: "svn" */'./Action')
const Add = () => import(/* webpackChunkName: "svn" */'./Add')
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
