import { Blockquote, Code, Em, Flex, Link, Strong, Text } from '@radix-ui/themes'
import 'katex/dist/katex.min.css'
import React, { FC, memo } from 'react'
import MarkdownRoot from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

interface MarkdownProps {
  children: string
}

// NOTE: Markdown has been memoized to prevent unnecessary re-renders when
// sibling components change, as rending markdown that includes e.g. images is expensive.
const Markdown: FC<MarkdownProps> = memo(({ children }) => {
  const componentMapping = {
    p(props) {
      return <Text as="p">{props.children}</Text>
    },
    em(props) {
      return <Em>{props.children}</Em>
    },
    strong(props) {
      return <Strong>{props.children}</Strong>
    },
    code(props) {
      const { children, ...rest } = props
      return <Code {...rest}>{children}</Code>
    },
    blockquote(props) {
      const { children, ...rest } = props
      return <Blockquote {...rest}>{children}</Blockquote>
    },
    a(props) {
      const { children, ...rest } = props
      return <Link {...rest}>{children}</Link>
    },
    img(props) {
      return <img alt="" style={{ width: '100%', height: 'auto' }} {...props} />
    },
  }
  return (
    <Flex direction="column" gap="4">
      <MarkdownRoot
        components={componentMapping}
        urlTransform={(value: string) => value}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {children}
      </MarkdownRoot>
    </Flex>
  )
})

export default Markdown
