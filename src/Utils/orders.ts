/*
 * Utils: Orders
 */

import { useTranslation } from 'Core/config/i18n/i18n'
import { PeriodSchema, PublicOrderSchema } from 'Api'
import { ModuleID } from 'Utils/app/modules'
import { sum, toLower } from 'lodash'
import { useCallback } from 'react'

export const useGetOrderLabel = () => {
  const [t] = useTranslation()

  return useCallback(
    (period: PeriodSchema): string => {
      return t(`plurals.${toLower(period.unit)}`, { count: period.count })
    },
    [t],
  )
}

export const getOrderTotalPrice = (data: PublicOrderSchema | undefined) => {
  return sum(data?.modules?.map((i) => i.price))
}

export class OrderUtils {
  static getModule(order: PublicOrderSchema, moduleID: ModuleID) {
    return order.modules?.find((i) => i.module === moduleID)
  }
  static getModuleSettings(order: PublicOrderSchema, moduleID: ModuleID) {
    return this.getModule(order, moduleID)?.settings
  }
}
