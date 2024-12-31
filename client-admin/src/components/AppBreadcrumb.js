import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'
import { useTranslation } from 'react-i18next';
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const location = useLocation();
  const currentLocation = location.pathname
  const { t } = useTranslation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }
  const breadcrumbs = getBreadcrumbs(currentLocation)
  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/">{t('messageView.home')}</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {t("messageView." + breadcrumb.name) + (query && query.trim().length > 0 ? " " + t('page.' + query) : "")}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
