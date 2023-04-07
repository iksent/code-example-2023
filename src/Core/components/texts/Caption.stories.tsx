import React from 'react'
import { reverse } from 'lodash'
import { Meta, Story } from '@storybook/react/types-6-0'
import StoriesDashboardSection from '../storybook/DashboardSection'
import CustomizableSection from '../storybook/CustomizableSection'
import Caption, { AllCaptionVariants, CaptionProps } from 'Core/components/texts/Caption'

export default {
  title: 'Core/Caption',
  component: Caption,
} as Meta

export const Dashboard: Story<CaptionProps> = () => {
  return (
    <div>
      <StoriesDashboardSection title="Variants" direction="column">
        {reverse(AllCaptionVariants).map((v) => (
          <Caption key={v} variant={v}>
            {`Caption ${v}`}
          </Caption>
        ))}
      </StoriesDashboardSection>
    </div>
  )
}

export const Customizable: Story<CaptionProps> = (props: CaptionProps) => (
  <CustomizableSection>
    <Caption {...props} />
  </CustomizableSection>
)

Customizable.args = {
  children: 'Caption',
  variant: 'lg',
}
