import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Menu } from 'react-feather'
import Button, { ButtonProps, ButtonVariants, ButtonSizes } from './Button'
import StoriesDashboardSection from '../storybook/DashboardSection'
import CustomizableSection from '../storybook/CustomizableSection'

export default {
  title: 'Core/Button',
  component: Button,
} as Meta

export const Dashboard: Story<ButtonProps> = () => {
  return (
    <div>
      <StoriesDashboardSection title="Sizes + Variants" columnSize="150px">
        {ButtonVariants.map((v) =>
          ButtonSizes.map((s) => (
            <Button key={s} variant={v} size={s} title={[v, s].join(' + ')} />
          )),
        )}
      </StoriesDashboardSection>

      <StoriesDashboardSection title="Icon Button" columnSize="50px">
        {ButtonVariants.map((v) =>
          ButtonSizes.map((s) => <Button key={s} variant={v} size={s} iconEnd={Menu} />),
        )}
      </StoriesDashboardSection>

      <StoriesDashboardSection title="With icon" columnSize="250px">
        <Button iconStart={Menu} variant="base" title="Start icon" />
        <Button iconEnd={Menu} variant="base" title="End icon" />
      </StoriesDashboardSection>

      <StoriesDashboardSection title="Loading" columnSize="150px">
        <Button title="Button" isFetching={true} />
        <Button iconEnd={Menu} isFetching={true} />
      </StoriesDashboardSection>
    </div>
  )
}

export const Customizable: Story<ButtonProps> = (props: ButtonProps) => (
  <CustomizableSection>
    <Button {...props} />
  </CustomizableSection>
)

Customizable.args = {
  title: 'Button',
  variant: 'base',
  size: 'small',
  iconEnd: undefined,
}
