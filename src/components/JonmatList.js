import React from 'react'
import styled from '@emotion/styled'
import JonmatListItem from './JonmatListItem'
import { useData } from 'utils/data'

const Wrapper = styled.div`
  width: 420px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  overflow: auto;
  z-index: 500;
  background: white;
  padding-top: 80px;
`

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  padding: 0;
  list-style: none;
`

const JonmatList = ({ ...props }) => {
  const { restaurants } = useData()

  return (
    <Wrapper {...props}>
      <Ul>
        {restaurants.map(item => (
          <Li key={item.id}>
            <JonmatListItem item={item} />
          </Li>
        ))}
      </Ul>
    </Wrapper>
  )
}

export default JonmatList
