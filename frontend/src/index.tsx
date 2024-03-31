import 'antd/dist/reset.css'
import { MainPage } from 'pages/Main'
import { PloggingCourseCreatePage } from 'pages/Plogging/Course/Create'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as any)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/plogging/course/create" element={<PloggingCourseCreatePage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
