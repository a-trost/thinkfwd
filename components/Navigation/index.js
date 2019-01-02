import { withRouter } from 'next/router'
import { Container } from '../../lib/helpers'
import { Link } from '../../lib/routes'
import { prefetch } from 'next-apollo'
import Button from '../Button'
import {
  ButtonContainer,
  LogoLink,
  Nav,
  NavLink,
  Root,
  Logo,
  Wrapper
} from './styles'

export default withRouter(({ router: { asPath } }) => {
  return (
    <Root>
      <Container>
        <Wrapper>
          <Nav>
            <Link route="/events" passHref>
              <NavLink isActive={asPath && asPath.includes('events')}>
                Events
              </NavLink>
            </Link>
            <Link route="/sprints" passHref>
              <NavLink
                onMouseOver={() => prefetch('/page?slug=sprints')}
                isActive={asPath && asPath.includes('sprints')}>
                Sprints
              </NavLink>
            </Link>
          </Nav>
          <Link route="/" passHref>
            <LogoLink onMouseOver={() => prefetch('/page?slug=home')}>
              <Logo src="/static/img/logo.svg" />
            </LogoLink>
          </Link>
          <ButtonContainer>
            <Link route="/toolkit" passHref>
              <NavLink
                onMouseOver={() => prefetch('/page?slug=toolkit')}
                isActive={asPath && asPath.includes('toolkit')}>
                Toolkit
              </NavLink>
            </Link>
            <Link route="/about" passHref>
              <NavLink isActive={asPath && asPath.includes('about')}>
                About
              </NavLink>
            </Link>
            <Link route="/contact" passHref>
              <Button as="a" variant="outline">
                Get In Touch
              </Button>
            </Link>
          </ButtonContainer>
        </Wrapper>
      </Container>
    </Root>
  )
})
