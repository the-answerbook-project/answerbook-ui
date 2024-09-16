import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Box, Button, CheckboxGroup, Grid, Heading, Popover, Separator } from '@radix-ui/themes'
import { size } from 'lodash'
import { FC, useState } from 'react'

import { Question } from '../../types/exam'
import { numberToLetter, numberToRoman } from '../../utils/common'

interface HorizontalMarkingPaneProps {
  questions: Record<number, Question>
}

const HorizontalMarkingPane: FC<HorizontalMarkingPaneProps> = ({ questions }) => {
  const [selectedSections, updateSelectedSections] = useState([])

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">
          <MixerHorizontalIcon width="16" height="16" />
          Horizontal Marking
        </Button>
      </Popover.Trigger>
      <Popover.Content minWidth="40vw">
        <Grid gap="5" columns={size(questions).toString()}>
          {Object.entries(questions).map(([q, question]) => (
            <Box p="2">
              <Heading>Question {q}</Heading>
              <Separator size="4" />
              {Object.entries(question.parts).map(([p, part]) => (
                <Box p="1">
                  <Heading size="5" as="h2">
                    Part {numberToLetter(Number(p))}
                  </Heading>
                  <Box p="1">
                    <CheckboxGroup.Root>
                      {Object.keys(part.sections).map((s) => {
                        const sectionId = `${q}-${p}-${s}`
                        return (
                          <CheckboxGroup.Item value={sectionId}>
                            Section {numberToRoman(Number(s))}
                          </CheckboxGroup.Item>
                        )
                      })}
                    </CheckboxGroup.Root>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Grid>
      </Popover.Content>
    </Popover.Root>
  )
}

export default HorizontalMarkingPane
