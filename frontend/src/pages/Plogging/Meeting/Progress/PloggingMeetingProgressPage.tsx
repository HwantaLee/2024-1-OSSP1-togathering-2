import { IconCheck, IconPhoto } from '@tabler/icons-react'
import { Header } from 'components/Header'
import { PLOGGING_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { useBooleanState } from 'hooks/useBooleanState'
import { PloggingMeetingViewer } from 'pages/Plogging/components/PloggingMeetingViewer'
import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MeetingListType } from 'types/meeting'
import {
  ButtonContainer,
  ContentContainer,
  ImageUploadButton,
  ImageUploadButtonTypo,
  InfoContainer,
  InfoItemContainer,
  InfoItemContentTypo,
  InfoItemTitleTypo,
  Root,
  StopButton,
  StopButtonTypo,
  SubtitleTypo,
} from './styled'

type PloggingMeetingProgressPageProps = {
  className?: string
}

export const PloggingMeetingProgressPage: FC<PloggingMeetingProgressPageProps> = ({ className }) => {
  const { state } = useLocation()
  const { ploggingMeetingId } = state
  const navigate = useNavigate()
  const [meetingList] = useState<MeetingListType>(PLOGGING_MEETING_LIST_SAMPLE)
  const { state: isSimulating, setTrue: startSimulate, setFalse: stopSimulate } = useBooleanState(false)

  const selectedPloggingMeetingItem =
    meetingList.filter((meetingItem) => meetingItem.id === ploggingMeetingId).length > 0
      ? meetingList.filter((meetingItem) => meetingItem.id === ploggingMeetingId)[0]
      : null

  const onClickTestButton = () => {
    startSimulate()
    return
  }
  const onClickButtonPloggingDone = () => {
    navigate('/plogging/meeting/review')
    return
  }

  return (
    <Root className={className}>
      <Header showLogo />
      <SubtitleTypo>
        모두 함께 아자아자 파이팅!
        <br />
        오늘의 활동으로 건강해지고 있어요!
      </SubtitleTypo>
      {selectedPloggingMeetingItem && (
        <ContentContainer>
          <PloggingMeetingViewer
            isDetail={true}
            meetingItem={selectedPloggingMeetingItem}
            isSimulating={isSimulating}
            stopSimulate={stopSimulate}
          />
          <InfoContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>이동한 거리</InfoItemTitleTypo>
              <InfoItemContentTypo>298m / 1,000m</InfoItemContentTypo>
            </InfoItemContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>시간</InfoItemTitleTypo>
              <InfoItemContentTypo>00:07:34</InfoItemContentTypo>
            </InfoItemContainer>
          </InfoContainer>
          <InfoContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>제보한 쓰레기</InfoItemTitleTypo>
              <InfoItemContentTypo>2개</InfoItemContentTypo>
            </InfoItemContainer>
            <InfoItemContainer isDivided>
              <InfoItemTitleTypo>획득한 점수</InfoItemTitleTypo>
              <InfoItemContentTypo>10점</InfoItemContentTypo>
            </InfoItemContainer>
          </InfoContainer>
          <ButtonContainer>
            <ImageUploadButton type={'primary'} onClick={onClickTestButton}>
              <IconPhoto />
              <ImageUploadButtonTypo>인증 사진 업로드</ImageUploadButtonTypo>
            </ImageUploadButton>
            <StopButton onClick={onClickButtonPloggingDone}>
              <IconCheck />
              <StopButtonTypo>플로깅 완료하기</StopButtonTypo>
            </StopButton>
          </ButtonContainer>
        </ContentContainer>
      )}
    </Root>
  )
}
