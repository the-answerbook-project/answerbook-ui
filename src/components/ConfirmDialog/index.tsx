import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

interface ConfirmDialogProps {
  title: string
  description: string
  open: boolean
  setOpen: (open: boolean) => void
  onConfirm?: () => void
  onCancel?: () => void
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  return (
    <AlertDialog.Root open={props.open}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{props.title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{props.description}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel
            onClick={() => {
              props.setOpen(false)
              props.onCancel && props.onCancel()
            }}
          >
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action
            onClick={() => {
              props.setOpen(false)
              props.onConfirm && props.onConfirm()
            }}
          >
            <Button variant="solid" color="red">
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
