import { withRouter } from 'next/router'
import { Link } from '../../routes'
import {
  Root,
  Wrapper,
  LogoLink,
  Nav,
  NavLink,
  ButtonContainer
} from './styles'
import { Container, prefetch } from '../../lib/helpers'
import Button from '../Button'

export default withRouter(({ router, router: { asPath } }) => {
  return (
    <Root>
      <Container>
        <Wrapper>
          <Nav>
            <Link route="/education" passHref>
              <NavLink isActive={asPath.includes('education')}>
                Education
              </NavLink>
            </Link>
            <Link route="/toolkits" passHref>
              <NavLink isActive={asPath.includes('toolkits')}>Toolkits</NavLink>
            </Link>
            <Link route="/blog" passHref>
              <NavLink isActive={asPath.includes('blug')}>Blog</NavLink>
            </Link>
            <Link route="/about" passHref>
              <NavLink isActive={asPath.includes('about')}>About</NavLink>
            </Link>
          </Nav>
          <Link route="/">
            <LogoLink>
              <img src="/static/img/logo.svg" />
            </LogoLink>
          </Link>
          <ButtonContainer>
            <Button as="a" secondary>
              Get In Touch
            </Button>
          </ButtonContainer>
        </Wrapper>
      </Container>
    </Root>
  )
})
