import { Flex } from '@radix-ui/themes'
import { isEmpty, isNil, sum, sumBy } from 'lodash'
import React, { FC } from 'react'

import { Question as QuestionType } from '../../../types/exam'
import { MarkRoot } from '../../../types/marking'
import { numberToLetter, numberToRoman } from '../../../utils/common'
import { ScrollspyItem } from './ScrollspyItem'

interface ScrollspyProps {
  questions: Record<number, QuestionType>
  marks: MarkRoot[]
  activeId: string | undefined
}

const Scrollspy: FC<ScrollspyProps> = ({ questions, marks, activeId }) => {
  function currentQuestionMark(q: number): number | undefined {
    let relevantMarks = marks.filter((m) => m.question === q && !isNil(m.mark))
    return isEmpty(relevantMarks) ? undefined : sumBy(relevantMarks, 'mark')
  }

  function currentSectionMark(q: number, p: number, s: number): number | undefined {
    return marks.find((m) => m.question === q && m.part === p && m.section === s)?.mark
  }

  function pendingMarking(question: QuestionType, questionNumber: number): boolean {
    let relevantMarks = marks.filter((m) => m.question === questionNumber && !isNil(m.mark))
    return sum(relevantMarks) !== question.totalSections
  }

  return (
    <Flex direction="column" gap="6" m="4" p="4">
      {Object.entries(questions).map(([q_, question]) => {
        const q = Number(q_)
        const partial = currentQuestionMark(q)
        const total = question.availableMarks
        const color = pendingMarking(question, q) ? 'gray' : isNil(partial) ? 'red' : 'green'
        return (
          <Flex direction="column" gap="2">
            <ScrollspyItem
              id={`q${q}`}
              active={!!activeId?.startsWith(`q${q}`)}
              label={`Question ${q}`}
              badgeProps={{ partial, total, color }}
            />
            <Flex direction="column" gap="0.5">
              {Object.entries(question.parts).map(([p_, part]) => {
                const p = Number(p_)
                return Object.entries(part.sections).map(([s_, section]) => {
                  const s = Number(s_)
                  const partial = currentSectionMark(q, p, s)
                  const total = section.maximumMark
                  const color = isNil(partial) ? 'red' : 'green'
                  return (
                    <ScrollspyItem
                      id={`q${q}-${p}-${s}`}
                      active={activeId === `q${q}-${p}-${s}`}
                      label={`Part (${numberToLetter(p)}) ${numberToRoman(s)}`}
                      indent={true}
                      badgeProps={{ partial, total, color }}
                    />
                  )
                })
              })}
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default Scrollspy
