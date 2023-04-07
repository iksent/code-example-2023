/*
 * Routes
 */
import { entityRoute, getEntityLink, PATH_KEYS } from 'Core/utils/routing'
import { createUrl } from 'Core/utils/network/utils'
import { ModuleID } from 'Utils/app/modules'
import { FormikValues } from 'formik'

const slugParams = { pathKey: PATH_KEYS.slug }

export const ROUTES = {
  main: {
    index: '/',
    orders: '/orders',
    order: entityRoute('/orders', undefined, slugParams),
    createOrder: '/orders/new',
    blog: '/blog',
  },
}

export const ROUTE_LINKS = {
  main: {
    getIndex: () => ROUTES.main.index,
    getOrders: () => ROUTES.main.orders,
    getOrder: (id: number) => {
      return getEntityLink(ROUTES.main.order, id, slugParams)
    },
    getCreateOrder: (enableModule?: ModuleID, values?: FormikValues) => {
      return createUrl({
        path: ROUTES.main.createOrder,
        query: enableModule
          ? {
              ...values,
              enable: enableModule,
            }
          : undefined,
      })
    },
    getBlog: () => ROUTES.main.blog,
  },
}
