import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilPuzzle } from '@coreui/icons';
import { CNavGroup, CNavItem } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const NavConfig = () => {
  const { t } = useTranslation();
  const _nav = [
    {
      component: CNavItem,
      name: t('page.home'),
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: t('page.bill'),
      to: '/page?query=bill',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
  ];

  return _nav;
};

export default NavConfig;


