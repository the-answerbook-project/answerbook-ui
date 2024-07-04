import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Select } from '@radix-ui/themes'
import React, { ComponentProps, useCallback } from 'react'
import { matchPath, useLocation, useNavigate, useParams } from 'react-router-dom'

import { DEFAULT_TEST_USERNAME } from '../../utils/globalConstants'

const UserSelector = () => {
  const options = [
    DEFAULT_TEST_USERNAME,
    'hgranger',
    'rweasley',
    'kss22',
    'jsbailey',
    'bn322',
    'ma4723',
    'ab1223',
  ]

  const url = useLocation()
  const navigate = useNavigate()

  const { username = DEFAULT_TEST_USERNAME } = useParams()

  const pathMatch = matchPath({ path: '/questions/:number/:username' }, url.pathname)
  const handleValueChange = useCallback(
    (value: string) => {
      if (url.pathname.includes('marking')) {
        navigate(`/marking/${value}`)
      } else if (url.pathname.includes('questions')) {
        navigate(`/questions/${pathMatch?.params?.number}/${value}`)
      }
    },
    [url.pathname, navigate, pathMatch?.params?.number]
  )

  return (
    <Select.Root defaultValue={username} onValueChange={handleValueChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          {options.map((option) => (
            <Select.Item key={option} value={option}>
              {option}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default UserSelector
