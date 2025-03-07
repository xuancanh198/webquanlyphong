import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilPuzzle } from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const NavConfig = () => {
  const { t } = useTranslation();
  const addAdminPrefix = (navItems) => {
    return navItems.map((item) => {
      if (item.items) {
        return {
          ...item,
          items: addAdminPrefix(item.items),
        };
      }
      return {
        ...item,
        to: `/admin${item.to}`.replace('//', '/'), 
      };
    });
  };

  const _nav = [
    {
      component: CNavItem,
      name: t('page.home'),
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: t('page.staff'),
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: t('page.role'),
          to: '/page?query=role',
        },
        {
          component: CNavItem,
          name: t('page.staff'),
          to: '/page?query=staff',
        },
      ],
    },
    {
      component: CNavGroup,
      name: t('page.room'),
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: t('page.typeRoom'),
          to: '/page?query=typeRoom',
        },
        {
          component: CNavItem,
          name: t('page.floor'),
          to: '/page?query=floor',
        },
        {
          component: CNavItem,
          name: t('page.building'),
          to: '/page?query=building',
        },
        {
          component: CNavItem,
          name: t('page.service'),
          to: '/page?query=service',
        },
        {
          component: CNavItem,
          name: t('page.furniture'),
          to: '/page?query=furniture',
        },
        {
          component: CNavItem,
          name: t('page.room'),
          to: '/page?query=room',
        },
      ],
    },
    {
      component: CNavGroup,
      name: t('page.user'),
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: t('page.user'),
          to: '/page?query=user',
        },
        {
          component: CNavItem,
          name: t('page.contract'),
          to: '/page?query=contract',
        },
        {
          component: CNavItem,
          name: t('page.bill'),
          to: '/page?query=bill',
        },
        {
          component: CNavItem,
          name: t('page.transaction'),
          to: '/page?query=transaction',
        },
      ],
    },
    {
      component: CNavGroup,
      name: t('page.permisstion'),
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: t('page.permisstion'),
          to: '/page?query=permisstion',
        },
        {
          component: CNavItem,
          name: t('page.acction'),
          to: '/page?query=acction',
        },
        {
          component: CNavItem,
          name: t('page.permisstionDetail'),
          to: '/page?query=permisstionDetail',
        },
      ],
    },
    {
      component: CNavGroup,
      name: t('page.system'),
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: t('page.setting'),
          to: '/page?query=setting',
        },
        {
          component: CNavItem,
          name: t('page.activeLog'),
          to: '/page?query=activeLog',
        },
      ],
    },
  ];
  const navWithAdminPrefix = addAdminPrefix(_nav);

  return navWithAdminPrefix;
};

export default NavConfig;
