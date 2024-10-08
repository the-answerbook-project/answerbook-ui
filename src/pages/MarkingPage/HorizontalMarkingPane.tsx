import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  CheckboxGroup,
  Flex,
  Grid,
  Heading,
  Popover,
  Separator,
} from '@radix-ui/themes'
import {
  entries,
  every,
  flatMap,
  fromPairs,
  keys,
  map,
  mapValues,
  pickBy,
  size,
  some,
  values,
} from 'lodash'
import { FC, useState } from 'react'

import '../../index.css'
import { Question } from '../../types/exam'
import { numberToLetter, numberToRoman } from '../../utils/common'

interface HorizontalMarkingPaneProps {
  questions: Record<number, Question>
}

const HorizontalMarkingPane: FC<HorizontalMarkingPaneProps> = ({ questions }) => {
  const [sectionSelectionTable, setSectionSelectionTable] = useState<Record<string, boolean>>(
    fromPairs(
      flatMap(entries(questions), ([qn, q]) =>
        flatMap(entries(q.parts), ([pn, p]) =>
          map(entries(p.sections), ([sn]) => [`${qn}-${pn}-${sn}`, true])
        )
      )
    )
  )

  function handleUpdateAll(value: boolean) {
    setSectionSelectionTable((current) => mapValues(current, () => value))
  }

  function noneCheckedWithPrefix(collection: Record<string, boolean>, prefix: string) {
    return !every(
      pickBy(collection, (v, k) => k.startsWith(`${prefix}-`)),
      Boolean
    )
  }

  function handleUpdateByQuestion(questionID: string) {
    setSectionSelectionTable((current) => {
      let newValue = noneCheckedWithPrefix(current, questionID)
      return mapValues(current, (v, k) => (k.startsWith(`${questionID}-`) ? newValue : v))
    })
  }

  function handleUpdateByPart(partID: string) {
    setSectionSelectionTable((current) => {
      let newValue = noneCheckedWithPrefix(current, partID)
      return mapValues(current, (v, k) => (k.startsWith(`${partID}-`) ? newValue : v))
    })
  }

  function handleSectionSelectionUpdate(partID: string, sectionIDs: string[]) {
    setSectionSelectionTable((current) =>
      mapValues(current, (v, k) => (k.startsWith(`${partID}-`) ? sectionIDs.includes(k) : v))
    )
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">
          <MixerHorizontalIcon width="16" height="16" />
          Horizontal Marking
        </Button>
      </Popover.Trigger>
      <Popover.Content minWidth="20vw">
        <Grid gap="5" columns={size(questions).toString()}>
          {Object.entries(questions).map(([q, question]) => (
            <Box p="2">
              <Heading onClick={() => handleUpdateByQuestion(q)}>Question {q}</Heading>
              <Separator size="4" />
              {Object.entries(question.parts).map(([p, part]) => {
                const partID = `${q}-${p}`
                return (
                  <Box key={partID} p="1">
                    <Heading size="5" as="h2" onClick={() => handleUpdateByPart(partID)}>
                      Part {numberToLetter(Number(p))}
                    </Heading>
                    <Box p="1">
                      <CheckboxGroup.Root
                        value={keys(pickBy(sectionSelectionTable, Boolean))}
                        onValueChange={(vs) => handleSectionSelectionUpdate(partID, vs)}
                      >
                        {Object.keys(part.sections).map((s) => {
                          const sectionID = `${q}-${p}-${s}`
                          return (
                            <CheckboxGroup.Item key={sectionID} value={sectionID}>
                              Section {numberToRoman(Number(s))}
                            </CheckboxGroup.Item>
                          )
                        })}
                      </CheckboxGroup.Root>
                    </Box>
                  </Box>
                )
              })}
            </Box>
          ))}
        </Grid>
        <Flex justify="center" align="center" className="button-group">
          <Button
            color="gray"
            onClick={() => handleUpdateAll(true)}
            disabled={every(values(sectionSelectionTable))}
          >
            All
          </Button>
          <Button
            color="gray"
            onClick={() => handleUpdateAll(false)}
            disabled={!some(values(sectionSelectionTable))}
          >
            None
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export default HorizontalMarkingPane
