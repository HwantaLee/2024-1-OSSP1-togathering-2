import { Button, DatePicker, Select, TimePicker, Typography } from 'antd'
import styled from 'styled-components'
import { lightTheme } from 'styles/theme'

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  padding-top: 60px;
`

export const SubtitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
`

export const SubtitleCircle = styled.div`
  width: 28px;
  height: 28px;
  background: ${lightTheme.colors.primary['500']};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
`

export const SubtitleCircleTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  color: ${lightTheme.colors.base['50']};
`

export const SubtitleTypo = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
  color: ${lightTheme.colors.base['700']};
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CategorySelectContainer = styled.div``

export const CategorySelect = styled(Select)`
  width: 100%;
`

export const ContentDatePicker = styled(DatePicker)`
  &&& {
    height: 32px;
  }
`

export const ContentTimePicker = styled(TimePicker)`
  &&& {
    height: 32px;
  }
`

export const SubmitButton = styled(Button)`
  height: 40px;
  background: ${lightTheme.colors.primary['600']};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`

export const SubmitButtonTypo = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  color: ${lightTheme.colors.base['50']};
`
