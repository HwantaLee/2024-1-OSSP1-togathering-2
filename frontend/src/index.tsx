import 'antd/dist/reset.css'
import { CommonContainer } from 'components/CommonContainer'
import 'global.css'
import { MainPage } from 'pages/Main'
import { PloggingCourseCreatePage } from 'pages/Plogging/Course/Create'
import { PloggingCourseListPage } from 'pages/Plogging/Course/List'
import { PloggingSoloAlertPage } from 'pages/Plogging/Solo/Alert'
import { PloggingSoloConfirmPage } from 'pages/Plogging/Solo/Confirm'
import { PloggingSoloCreatePage } from 'pages/Plogging/Solo/Create'
import { PloggingSoloProgressPage } from 'pages/Plogging/Solo/Progress'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as any)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CommonContainer>
        <Routes>
          <Route path="/plogging/course/list" element={<PloggingCourseListPage />} />
          <Route path="/plogging/course/create" element={<PloggingCourseCreatePage />} />

          <Route path="/plogging/solo/create" element={<PloggingSoloCreatePage />} />
          <Route path="/plogging/solo/confirm" element={<PloggingSoloConfirmPage />} />
          <Route path="/plogging/solo/alert" element={<PloggingSoloAlertPage />} />
          <Route path="/plogging/solo/progress" element={<PloggingSoloProgressPage />} />

          <Route path="/" element={<MainPage />} />
        </Routes>
      </CommonContainer>
    </BrowserRouter>
  </React.StrictMode>
)
