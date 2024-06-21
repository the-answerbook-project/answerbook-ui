import { Badge, Box, Button, Card, Flex, Grid, Separator, Text, TextField } from '@radix-ui/themes'
import { formatDistanceToNow } from 'date-fns'
import { find, isEmpty } from 'lodash'
import React, { FC, useMemo } from 'react'

import CardBody from '../../../components/Card/CardBody'
import CardFooter from '../../../components/Card/CardFooter'
import CardHeader from '../../../components/Card/CardHeader'
import { Mark } from '../../../types/marking'
import './index.css'

interface MarkInputPanelProps {
  marks: Mark[]
  maximumMark: number
  onSave: () => void
}

const NO_MARK = 'No mark'
const NO_FEEDBACK = 'No comment'

const MarkInputPanel: FC<MarkInputPanelProps> = ({ marks, maximumMark, onSave }) => {
  const latestMark = useMemo(() => find(marks, (o) => o.mark !== undefined)?.mark, [marks])
  const colour = useMemo(() => (latestMark ? 'green' : 'red'), [latestMark])

  const MarkHistory = () => {
    return (
      <ul className={'list'}>
        {marks.map((m, i) => {
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
    <Card className={`card-${colour}`}>
      <CardHeader colour={colour}>
        <Flex justify="between">
          <Text>Mark awarded for this section</Text>
          <Badge radius="full" variant="solid" color={colour}>
            {latestMark ?? NO_MARK} <Separator orientation="vertical" color="gray" /> {maximumMark}
          </Badge>
        </Flex>
      </CardHeader>
      {isEmpty(marks) ? <NoMarksBody /> : <MarkHistory />}
      <CardFooter>
        <Grid columns={'7fr 1fr 1fr'} className={'mark-input-area'}>
          <TextField.Root
            radius="small"
            placeholder="Comment (Optional)"
            className={'feedback-field'}
          />
          <TextField.Root radius="none" type="number" placeholder="Mark" className={'mark-field'} />
          <Button color="gray" radius="none" className={'mark-button'}>
            Record
          </Button>
        </Grid>
      </CardFooter>
    </Card>
  )
}

export default MarkInputPanel
