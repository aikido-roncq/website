import NextLink from 'next/link';

const Link = ({ children, href, ...props }) => (
  <NextLink href={href}>
    <a {...props}>{children}</a>
  </NextLink>
);

export default Link;
