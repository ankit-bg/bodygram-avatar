import { themeStyled } from '../Theme'

type AvatarPostureAnalysisDataCardProps = {
  /**
   * The title of the card.
   */
  name: string
  /**
   * The value of the card.
   */
  value: number
}

const Container = themeStyled.div`
  padding: 8px;
  font-family: ${({ theme }) => theme.fontFamily};
  margin-bottom: 10px;
`

const Name = themeStyled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text[500]};
`

const Value = themeStyled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text[700]};
  margin-top: 4px;
`

export function AvatarPostureAnalysisDataCard(props: AvatarPostureAnalysisDataCardProps) {
  const { name, value } = props

  const _value = value.toFixed(0)
  return (
    <Container>
      <Name>{name}</Name>
      <Value>{_value === '-0' ? 0 : _value}° </Value>
    </Container>
  )
}
