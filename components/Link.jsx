import NextLink from 'next/link'

const Link = ({ children, href }) => {
  return (
    <NextLink href={href}>
      <a>{children}</a>
    </NextLink>
  )
}

export default Link
