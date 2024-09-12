import {
  FolderPlusIcon,
  ChartPieIcon,
  HomeIcon,
  NewspaperIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

const data = false;

export const routes: any[] = [
  { name: 'Home', href: '/', icon: HomeIcon, current: false },
  { name: 'Parval te informa', href: '/noticias', icon: NewspaperIcon, current: false },
  // { name: 'Denuncias', href: '/denuncias', icon: ChatBubbleBottomCenterTextIcon, current: false },
  {
    name: 'RRHH',
    href: '#',
    dropdownIcon: UserGroupIcon, // Icono del titulo!
    current: false,
    dropdownOptions: [
      // { name: 'Calendario parval', href: '/calendario', },
      { name: 'Solicitudes', href: '/rrhh/solicitudes', },
      { name: 'Aprobacion RRHH', href: '/aprobacion-rrhh', },
      { name: 'Aprobacion supervisor', href: '/aprobacion-supervisor', },
    ],
  },
  // { name: 'Home', href: '/', icon: HomeIcon, current: true },
  // {
  //   name: 'Noticias',
  //   href: '#',
  //   dropdownIcon: NewspaperIcon, // Icono del titulo!
  //   current: false,
  //   dropdownOptions: [
  //     { name: 'Noticias internas', href: '/noticias', icon: CalendarIcon },
  //     { name: 'Noticias publicas', href: '#', icon: CalendarIcon },
  //     { name: 'Organigrama', href: '#', icon: CalendarIcon },
  //     { name: 'Calendario', href: '#', icon: CalendarIcon },
  //   ],
  // },
  { name: 'Reportes', href: '/reportes', icon: ChartPieIcon, current: false },
  { name: 'Sistema de archivos', href: '/sistema-de-archivos', icon: FolderPlusIcon, current: false },
]



