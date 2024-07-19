// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
// mock the canvas API if excalidraw renders
import 'jest-canvas-mock'
import mockAxios from 'jest-mock-axios'

// See https://github.com/remarkjs/react-markdown/issues/635#issuecomment-956158474
jest.mock('react-markdown', () => (props) => <p data-testid="markdown">{props.children}</p>)
jest.mock('remark-gfm', () => () => {})
jest.mock('remark-math', () => () => {})
jest.mock('rehype-katex', () => () => {})
jest.mock('axios', () => mockAxios)
