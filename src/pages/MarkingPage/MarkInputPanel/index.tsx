import { Badge, Box, Button, Card, Flex, Grid, Text, TextField } from '@radix-ui/themes'
import { plainToInstance } from 'class-transformer'
import { formatDistanceToNow } from 'date-fns'
import { isEmpty, isNil, orderBy } from 'lodash'
import React, { FC, useState } from 'react'

import CardBody from '../../../components/Card/CardBody'
import CardFooter from '../../../components/Card/CardFooter'
import CardHeader from '../../../components/Card/CardHeader'
import { MarkRoot } from '../../../types/marking'
import MarkBadge from '../MarkBadge'
import { NO_MARK } from '../constants'
import './index.css'

interface MarkInputPanelProps {
  username: string
  question: number
  part: number
  section: number
  currentMark: MarkRoot
  maximumMark: number
  onSave: (_: MarkRoot) => void
}

const NO_FEEDBACK = 'No comment'

const MarkInputPanel: FC<MarkInputPanelProps> = ({
  username,
  question,
  part,
  section,
  currentMark,
  maximumMark,
  onSave,
}) => {
  const initMark = {
    username,
    question,
    part,
    section,
    mark: '',
    feedback: '',
  }
  const markHistory = orderBy(currentMark?.history, 'timestamp', 'desc') ?? []
  const color = !isNil(currentMark?.mark) ? 'green' : 'red'
  const [newMark, setNewMark] = useState(initMark)

  function handleChange(key: keyof MarkRoot, value: any) {
    setNewMark((prevState) => ({ ...prevState, [key]: value }))
  }

  function handleSave() {
    onSave(plainToInstance(MarkRoot, newMark))
    setNewMark(initMark)
  }

  const MarkHistory = () => {
    return (
      <ul className={'list'}>
        {markHistory.map((m, i) => {
          const timestamp = formatDistanceToNow(m.timestamp, {
            includeSeconds: true,
            addSuffix: true,
          })
          return (
            <Box asChild px="4" py="2" key={i}>
              <li>
                <Flex gap="2" direction="column">
                  <Flex justify="between">
                    <Text color={m.feedback ? undefined : 'gray'}>{m.feedback ?? NO_FEEDBACK}</Text>
                    <Badge radius="full" color="gray">
                      {m.mark ?? NO_MARK}
                    </Badge>
                  </Flex>
                  <Text color="gray" size="2">
                    - {m.marker}, {timestamp}
                  </Text>
                </Flex>
              </li>
            </Box>
          )
        })}
      </ul>
    )
  }

  const NoMarksBody = () => (
    <CardBody>
      <Text color="gray">No mark awarded yet</Text>
    </CardBody>
  )

  return (
    <Card className={`card-${color}`}>
      <CardHeader colour={color}>
        <Flex justify="between">
          <Text>Mark awarded for this section</Text>
          <MarkBadge partial={currentMark?.mark} total={maximumMark} color={color} />
        </Flex>
      </CardHeader>
      {isEmpty(markHistory) ? <NoMarksBody /> : <MarkHistory />}
      <CardFooter>
        <Grid columns={'7fr 1fr 1fr'} className={'mark-input-area'}>
          <TextField.Root
            value={newMark.feedback}
            onChange={(e) => handleChange('feedback', e.target.value)}
            radius="small"
            placeholder="Comment (Optional)"
            className={'feedback-field'}
          />
          <TextField.Root
            value={newMark.mark}
            onChange={(e) => handleChange('mark', e.target.value)}
            type="number"
            radius="none"
            placeholder="Mark"
            className={'mark-field'}
          />
          <Button
            disabled={isEmpty(newMark.mark) && isEmpty(newMark.feedback)}
            color="amber"
            radius="none"
            className={'mark-button'}
            onClick={handleSave}
          >
            Record
          </Button>
        </Grid>
      </CardFooter>
    </Card>
  )
}

export default MarkInputPanel
