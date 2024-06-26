import { Header } from 'components/Header'
import { TabBar } from 'components/TabBar'
import { MEETING_LIST_KEY, SELECTED_MEETING_LIST_KEY } from 'constants/common'
import { ALL_MEETING_LIST_SAMPLE } from 'constants/meeting'
import { PloggingMeetingViewer } from 'pages/Plogging/components/PloggingMeetingViewer'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocalSelectedMeetingListType, MeetingCategoryType, MeetingListType } from 'types/meeting'
import { loadLocalStorage } from 'utils/handleLocalStorage'
import {
  ContentContainer,
  LinkButton,
  LinkButtonTypo,
  NotFoundTypo,
  PloggingMeetingViewerContainer,
  PloggingMeetingViewerWrapper,
  Root,
  SubtitleTypo,
  TitleContainer,
  TitleTypo,
} from './styled'

type PloggingMeetingScheduledPageProps = {
  className?: string
}

export const PloggingMeetingScheduledPage: FC<PloggingMeetingScheduledPageProps> = ({ className }) => {
  const navigate = useNavigate()
  const [meetingList, setMeetingList] = useState<MeetingListType>([])

  const onClickMeetingViewer = (ploggingMeetingId: number, selectedCategory: MeetingCategoryType) => () => {
    navigate('/meeting/alert', { state: { ploggingMeetingId, selectedCategory } })
  }

  const onClickMeetingListPage = () => {
    navigate('/meeting/list')
  }

  useEffect(() => {
    let currentMeetingIdList = loadLocalStorage(SELECTED_MEETING_LIST_KEY)
    if (typeof currentMeetingIdList === 'string') {
      let parsedMeetingIdList = JSON.parse(currentMeetingIdList) as LocalSelectedMeetingListType

      let currentMeetingList = loadLocalStorage(MEETING_LIST_KEY)
      let parsedMeetingList: MeetingListType | null = null
      if (typeof currentMeetingList === 'string') {
        parsedMeetingList = JSON.parse(currentMeetingList).meetingList as MeetingListType
      }

      let allMeetingList = parsedMeetingList ? parsedMeetingList : ALL_MEETING_LIST_SAMPLE

      console.log(allMeetingList)
      setMeetingList(
        parsedMeetingIdList.selectedMeetingList.map((value) => {
          return allMeetingList.filter((value2) => value2.id === value.id)[0]
        })
      )
    }
  }, [])

  return (
    <Root className={className}>
      <Header showLogo={true} />
      <TitleContainer>
        <TitleTypo>안녕하세요, 교수님</TitleTypo>
        <SubtitleTypo>예정된 모임들을 모아봤어요!</SubtitleTypo>
      </TitleContainer>
      <ContentContainer>
        {meetingList.length > 0 ? (
          <PloggingMeetingViewerContainer>
            {meetingList.map((meetingItem) => (
              <PloggingMeetingViewerWrapper key={`plogging_meeting_viewer_${meetingItem.id}`}>
                <PloggingMeetingViewer
                  type={'SCHEDULED'}
                  meetingItem={meetingItem}
                  onStart={onClickMeetingViewer(meetingItem.id, meetingItem.category)}
                />
              </PloggingMeetingViewerWrapper>
            ))}
          </PloggingMeetingViewerContainer>
        ) : (
          <>
            <NotFoundTypo>예정된 모임이 없어요...</NotFoundTypo>
          </>
        )}
        <LinkButton type={'primary'} onClick={onClickMeetingListPage}>
          <LinkButtonTypo>모임 보러가기</LinkButtonTypo>
        </LinkButton>
      </ContentContainer>
      <TabBar />
    </Root>
  )
}
