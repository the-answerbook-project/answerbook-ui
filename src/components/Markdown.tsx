import { Blockquote, Code, Em, Link, Strong, Text } from '@radix-ui/themes'
import React, { FC } from 'react'
import { default as MarkdownRoot } from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownProps {
  children: string
}

const Markdown: FC<MarkdownProps> = ({ children }) => {
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
  }
  return (
    <MarkdownRoot components={componentMapping} remarkPlugins={[remarkGfm]}>
      {children}
    </MarkdownRoot>
  )
}

export default Markdown
