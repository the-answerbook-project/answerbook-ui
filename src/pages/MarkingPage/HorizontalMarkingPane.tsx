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
import { every, fromPairs, keys, mapValues, pickBy, size, some, values } from 'lodash'
import { FC, useEffect, useState } from 'react'

import '../../index.css'
import { Question } from '../../types/exam'
import { numberToLetter, numberToRoman } from '../../utils/common'

interface HorizontalMarkingPaneProps {
  questions: Record<number, Question>
  sectionIDs: string[]
  onActiveSectionsUpdate: (sectionIDs: string[]) => void
}

const HorizontalMarkingPane: FC<HorizontalMarkingPaneProps> = ({
  questions,
  sectionIDs,
  onActiveSectionsUpdate,
}) => {
  const [horizontalMarkingState, setHorizontalMarkingState] = useState<Record<string, boolean>>(
    fromPairs(sectionIDs.map((id) => [id, true]))
  )
  useEffect(() => {
    onActiveSectionsUpdate(keys(pickBy(horizontalMarkingState, (v, k) => v)))
  }, [horizontalMarkingState, onActiveSectionsUpdate])

  function handleUpdateAll(value: boolean) {
    setHorizontalMarkingState((current) => mapValues(current, () => value))
  }

  function visibleByPrefix(collection: Record<string, boolean>, prefix: string) {
    return some(
      pickBy(collection, (v, k) => k.startsWith(`${prefix}-`)),
      Boolean
    )
  }

  function handleBulkUpdateByPrefix(prefix: string) {
    setHorizontalMarkingState((current) => {
      let newValue = !visibleByPrefix(current, prefix)
      return mapValues(current, (v, k) => (k.startsWith(`${prefix}-`) ? newValue : v))
    })
  }

  function handleSectionSelectionUpdate(partID: string, sectionIDs: string[]) {
    setHorizontalMarkingState((current) =>
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
              <Heading onClick={() => handleBulkUpdateByPrefix(q)}>Question {q}</Heading>
              <Separator size="4" />
              {Object.entries(question.parts).map(([p, part]) => {
                const partID = `${q}-${p}`
                return (
                  <Box key={partID} p="1">
                    <Heading size="5" as="h2" onClick={() => handleBulkUpdateByPrefix(partID)}>
                      Part {numberToLetter(Number(p))}
                    </Heading>
                    <Box p="1">
                      <CheckboxGroup.Root
                        value={keys(pickBy(horizontalMarkingState, Boolean))}
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
            disabled={every(values(horizontalMarkingState))}
          >
            All
          </Button>
          <Button
            color="gray"
            onClick={() => handleUpdateAll(false)}
            disabled={!some(values(horizontalMarkingState))}
          >
            None
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export default HorizontalMarkingPane
