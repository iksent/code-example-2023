import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import StoriesDashboardSection from '../storybook/DashboardSection'
import CustomizableSection from '../storybook/CustomizableSection'
import Card, {
  CardPaddings,
  CardProps,
  CardRadiusVariants,
  CardVariants,
} from 'Core/components/Card/Card'

export default {
  title: 'Core/Card',
  component: Card,
} as Meta

export const Dashboard: Story<CardProps> = () => {
  return (
    <div>
      <StoriesDashboardSection title="Variants" columnSize="150px">
        {CardVariants.map((v) => (
          <Card key={v} variant={v} padding="xs">
            {v}
          </Card>
        ))}
      </StoriesDashboardSection>

      <StoriesDashboardSection title="Radius" columnSize="150px">
        {CardRadiusVariants.map((r) => (
          <Card key={r} borderRadius={r} padding="xs">
            {r}
          </Card>
        ))}
      </StoriesDashboardSection>

      <StoriesDashboardSection title="Paddings" columnSize="150px">
        {CardPaddings.map((p) => (
          <Card key={p} padding={p}>
            {p}
          </Card>
        ))}
      </StoriesDashboardSection>
    </div>
  )
}

export const Customizable: Story<CardProps> = (props: CardProps) => (
  <CustomizableSection>
    <Card {...props} />
  </CustomizableSection>
)

Customizable.args = {
  children: 'Card content',
  variant: 'base',
}
