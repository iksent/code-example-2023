import React from 'react'
import { size } from 'lodash'
import classNames from 'classnames'
import { ArrowRight } from 'react-feather'
import {
  Calendar,
  CalendarClock,
  CalendarWarning,
  WarningCircle,
} from 'react-swm-icon-pack'
import Card from 'Core/components/Card/Card'
import Row from 'Core/components/layout/Row'
import Caption from 'Core/components/texts/Caption'
import Button from 'Core/components/Button/Button'
import { useInnerTranslation, useTranslation } from 'Core/config/i18n/i18n'
import { ROUTE_LINKS } from 'Core/utils/routes'
import { getOrderTotalPrice, useGetOrderLabel } from 'Utils/app/orders'
import InfoRow from 'Core/components/InfoRow/InfoRow'
import Separator from 'Core/components/Separator/Separator'
import Price from 'Core/components/Price/Price'
import { MODULE_ICONS, useModules } from 'Utils/app/modules'
import Progress from 'Core/components/Progress/Progress'
import ModuleSummaryChips from 'Components/modules/ModuleSummaryChips/ModuleSummaryChips'
import {
  formatAPIDateTime,
  getDateProgress,
  getLocaledDateFormat,
  LOCALED_FORMATS_KEYS,
} from 'Core/utils/dateTime'
import { OrderStatus, PublicOrderSchema } from 'Api'
import ModuleTitle from 'Components/modules/ModuleTitle/ModuleTitle'
import styles from './OrderCard.module.scss'

export type OrderCardProps = {
  className?: string
  order: PublicOrderSchema
}

const OrderCard = (props: OrderCardProps) => {
  const { className = '', order } = props
  const [t] = useTranslation()
  const tOrders = useInnerTranslation('main', 'orders')
  const T = useInnerTranslation('main', 'orders.list.item')
  const getOrderLabel = useGetOrderLabel()
  const modules = useModules()

  const end_date = order.create_date
  const isActive = order.status === OrderStatus.STARTED
  const dateProgress = getDateProgress(order.create_date, end_date)
  const isFinishing = dateProgress > 90

  return (
    <Card className={classNames([styles.root, className])} padding="sm" borderRadius="md">
      <Row className={styles.header}>
        <Caption className={styles.name} variant="sm">
          <Caption
            className={styles.id}
            variant="sm"
            Component="span"
            color={order.title ? 'neutral-400' : undefined}
          >
            {`#${order.id}${order.title ? ' –' : ''}`}
          </Caption>
          &nbsp;
          {order.title || null}
        </Caption>
        <Button
          titleClassName={styles.moreTitle}
          title={T('more')}
          iconEnd={ArrowRight}
          link={ROUTE_LINKS.main.getOrder(order.id)}
          variant="alt"
          size="small"
        />
      </Row>
      <Row className={styles.infos} horizontal="between">
        <Row className={styles.infosList}>
          {order.period && (
            <InfoRow iconStart={Calendar} text={getOrderLabel(order.period)} />
          )}
          {isActive ? (
            <>
              <Progress className={styles.dateProgress} value={dateProgress} />
              <InfoRow
                iconStart={isFinishing ? CalendarWarning : CalendarClock}
                text={t('date_to', {
                  date: formatAPIDateTime(
                    end_date,
                    getLocaledDateFormat(
                      isFinishing
                        ? LOCALED_FORMATS_KEYS.DATE_TIME
                        : LOCALED_FORMATS_KEYS.DAY_MONTH,
                    ),
                  ),
                })}
              />
            </>
          ) : (
            <InfoRow
              iconStart={WarningCircle}
              text={tOrders(`statuses.${order.status || 'unknown'}`)}
            />
          )}
        </Row>
        <Price size="sm" value={getOrderTotalPrice(order)} />
      </Row>
      {size(order.modules) > 0 && (
        <>
          <Separator />
          <div className={styles.modules}>
            {order.modules?.map((module) => {
              const moduleID = module.module
              return (
                <Row key={moduleID} className={styles.module} horizontal="between">
                  <InfoRow
                    className={styles.moduleInfo}
                    iconStart={MODULE_ICONS[moduleID]}
                    text={
                      <ModuleTitle
                        title={modules?.find((i) => i.id === moduleID)?.title || '?'}
                      />
                    }
                  />
                  <ModuleSummaryChips
                    className={styles.moduleSettings}
                    order={order}
                    moduleID={moduleID}
                  />
                </Row>
              )
            })}
          </div>
        </>
      )}
    </Card>
  )
}

export default OrderCard
