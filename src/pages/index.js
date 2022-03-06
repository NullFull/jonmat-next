import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Layout from 'components/layout'
import JonmatList from 'components/JonmatList'

const JonmatMap = dynamic(() =>
  import('components/JonmatMap'), {
    ssr: false
  }
)

const IndexPage = () => (
  <Layout>
    <Head>
      <title>존맛국회</title>
    </Head>
    <JonmatMap />
    <JonmatList />
  </Layout>
)

export default IndexPage
