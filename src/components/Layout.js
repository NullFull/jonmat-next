import styled from '@emotion/styled'
import Logo from 'components/Logo'
import Menu from 'components/Menu'
import YearSelect from 'components/YearSelect'
import logo from 'assets/logo.png'

const headerHeight = '80px'

const Wrapper = styled.div`
  height: 100%;
`

// TODO : fixed 빼자
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${headerHeight};
  background: linear-gradient(to right, #f39eb2 0%,#acdff0 25%,#82c9a6 50%,#fbeb9d 75%,#f8bd91 100%,#f8bd91 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px;
  z-index: 600;
`

const Main = styled.main`
  position: relative;
  height: 100%;
`

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: #85c9a9;
  z-index: 500;
  display: flex;
  justify-content: flex-end;
  gap: 24px;
`

const NavLink = styled.a`
  display: block;
  color: red;
  text-decoration: none;
  animation: hue 1s infinite linear;
  padding: 8px 16px;
  @keyframes hue {
    from {
      filter: hue-rotate(0deg)
    }
    to {
      filter: hue-rotate(-360deg)
    }
  }
`

const Layout = ({ children }) => (
  <Wrapper>
    <Header>
      <Logo img src={logo.src} alt="존맛국회" />
      <Menu>
        <li>
          <NavLink href="https://docs.google.com/document/u/4/d/e/2PACX-1vQAkut1TTnFA7rJci2o5DvZOsMp-OSKdkh9ibFNM65ypoXEoLQSeWgaTW-0Zzv-OjQWLlB8T6cit5NE/pub">음식점 리뷰</NavLink>
        </li>
      </Menu>
    </Header>
    <Main>
      {children}
    </Main>
    <Footer>
      <YearSelect />
      <NavLink href="https://www.notion.so/Jonmat-8f61b408288d4776b45c1027ae7b4696">데이터 추가</NavLink>
    </Footer>
  </Wrapper>
)

export default Layout
