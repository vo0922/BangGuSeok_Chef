import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: '홈',
    path: '/home/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: '레시피',
    path: '/home/recipe',
    icon: getIcon(peopleFill)
  },
  {
    title: '셰프 랭킹',
    path: '/home/rank',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Q & A',
    path: '/home/qna',
    icon: getIcon(fileTextFill)
  },
  {
    title: '공지사항',
    path: '/404',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
