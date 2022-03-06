import styled from '@emotion/styled'
import Humanize from 'humanize-plus'
import { KIND_COLORS } from 'theme'

const Wrapper = styled.div`
  border: 0;
  border-bottom: 1px solid #cccccc !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 32px 10px 32px 10px;
  border-left: 6px solid ${props => props.color};
`

const Tag = styled.h4`
  font-family: 'Nanum Myeongjo', serif;
  background-color: ${props => props.color};
  width: 30px;
  height: 30px;
  border-radius: 15px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  color: white;
  top: 18px;
  left: 10px;
`

const Info = styled.div`
  font-size: 0.8rem;
  display: flex;
  gap: 8px;
`

const Name = styled.h3`
  font-weight: normal;
`

const Address = styled.p`
  font-size: 0.8rem;
`

const Price = styled.p`
  margin-top: 10px;
  font-size: 0.9rem;
`

const Count = styled.h3`
  .num {
    font-weight: normal;
    font-size: 3rem;
  }
  .unit {
    font-weight: normal;
    vertical-align: middle;
    font-size: 0.8rem;
    padding-left: 6px;
  }
`

const JonmatListItem = ({ item }) => {
  const color = KIND_COLORS[item.kind] || KIND_COLORS['기타']

  return (
    <Wrapper color={color}>
      <Info>
        <Tag color={color} />
        <div>
          <Name>{item.name}</Name>
          <Address>{item.address}</Address>
          <Price>{Humanize.intComma(item.totalPrice)}원</Price>
        </div>
      </Info>
      <Count>
        <span className="num">
          {item.times}
        </span>
        <span className="unit">
          회
        </span>
      </Count>
    </Wrapper>
  )
}

export default JonmatListItem
