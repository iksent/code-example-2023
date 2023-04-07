import React from 'react'
import Row from 'Core/components/layout/Row'
import Index from 'Core/components/Index/Index'
import Text from 'Core/components/texts/Text'
import Spacer from 'Core/components/Spacer/Spacer'

export type WorkStepProps = {
  className?: string
  index: number
  text: string
}

const WorkStep = (props: WorkStepProps) => {
  const { className = '', index, text } = props

  return (
    <Row className={className}>
      <Index variant="sm" value={index} />
      <Spacer width={2} />
      <Text style={{ flex: 1 }} variant="sm" weight="bold">
        {text}
      </Text>
    </Row>
  )
}

export default WorkStep
