import { Flex } from '@radix-ui/themes'
import { isEmpty, isNil, sumBy } from 'lodash'
import React, { FC } from 'react'

import { Question as QuestionType } from '../../../types/exam'
import { MarkRoot } from '../../../types/marking'
import { numberToLetter, numberToRoman } from '../../../utils/common'
import { ScrollspyItem } from './ScrollspyItem'

interface ScrollspyProps {
  questions: Record<number, QuestionType>
  marks: MarkRoot[]
}

const Scrollspy: FC<ScrollspyProps> = ({ questions, marks }) => {
  function questionPartial(q: number): number | undefined {
    let relevantMarks = marks.filter((m) => m.question === q && !isNil(m.mark))
    return isEmpty(relevantMarks) ? undefined : sumBy(relevantMarks, 'mark')
  }

  function sectionPartial(q: number, p: number, s: number): number | undefined {
    return marks.find((m) => m.question === q && m.part === p && m.section === s)?.mark
  }

  return (
    <Flex direction="column" gap="8" p="4">
      {Object.entries(questions).map(([q_, question]) => {
        const q = Number(q_)
        return (
          <Flex direction="column" gap="2">
            <ScrollspyItem
              id={`q${q}`}
              label={`Question ${q}`}
              total={question.availableMarks}
              partial={questionPartial(q)}
            />
            {Object.entries(question.parts).map(([p_, part]) => {
              const p = Number(p_)
              return Object.entries(part.sections).map(([s_, section]) => {
                const s = Number(s_)
                return (
                  <ScrollspyItem
                    id={`q${q}-${p}-${s}`}
                    label={`Part ${numberToLetter(p)} ${numberToRoman(s)}`}
                    total={section.maximumMark}
                    partial={sectionPartial(q, p, s)}
                    indent={true}
                  />
                )
              })
            })}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default Scrollspy
