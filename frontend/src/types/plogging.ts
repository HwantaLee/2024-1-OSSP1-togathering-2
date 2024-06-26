export type CoordinateItemType = {
  lat: number
  lng: number
}

export type CourseCoordinateItemType = {
  isFlag: boolean
  isPassed: boolean
  name?: string
} & CoordinateItemType

export type CourseCoordinateListType = CourseCoordinateItemType[]

export type CourseItemType = {
  id: number
  coordinateList: CourseCoordinateListType
  name?: string
  isHidden?: boolean
}

export type CourseListType = CourseItemType[]

export type LocalStorageCourseListType = {
  courseList: CourseListType
}
