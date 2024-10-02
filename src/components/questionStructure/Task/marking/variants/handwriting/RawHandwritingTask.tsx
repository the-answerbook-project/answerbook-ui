import { FC } from 'react'

import { TaskType } from '../../../constants'
import { TaskBaseProps } from '../../../types'
import { ViewOnlyCanvas } from './components/ViewOnlyCanvas'

export interface RawHandwritingProps extends TaskBaseProps {
  type: TaskType.RAW_HANDWRITING
}

export const RawHandwritingTask: FC<RawHandwritingProps> = ({ answer }) => {
  return (
    <ViewOnlyCanvas
      initialData={JSON.parse(answer.answer)?.raw?.elements ?? []}
      minHeight="500px"
    />
  )
}
