import { TaskType } from '../../components/questionStructure/Task/constants'
import { parseAnswer } from '../../utils/answers'

describe('parseAnswer', () => {
  test.each([
    { answer: '42', taskType: TaskType.INTEGER, expected: 42 },
    {
      answer: 'a,b,c',
      taskType: TaskType.MULTIPLE_CHOICE_SELECT_SEVERAL,
      expected: ['a', 'b', 'c'],
    },
    { answer: 'some text', taskType: TaskType.ESSAY, expected: 'some text' },
    { answer: 'some code', taskType: TaskType.CODE, expected: 'some code' },
    { answer: '123', taskType: TaskType.FLAG, expected: '123' },
    { answer: 'A', taskType: TaskType.MULTIPLE_CHOICE_SELECT_ONE, expected: 'A' },
  ])('should parse answer correctly for $taskType', ({ answer, taskType, expected }) => {
    expect(parseAnswer(answer, taskType)).toEqual(expected)
  })
})
