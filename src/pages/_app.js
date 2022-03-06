import React from 'react'
import { css, Global } from '@emotion/react'
import { DataProvider } from 'utils/data'
import 'modern-css-reset/dist/reset.css'

const globalStyles = css`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    font-family: sans-serif;
    color: #414042;
  }
  #__next {
    height: 100%;
  }
  div {
    margin: 0;
  }
`

const CustomApp = ({ Component, pageProps }) => (
  <DataProvider>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </DataProvider>
)

export default CustomApp
