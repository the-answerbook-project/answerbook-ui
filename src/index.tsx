import { Theme, ThemePanel } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'reflect-metadata'

import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Theme>
      <App />
      <ThemePanel defaultOpen={false} />
    </Theme>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
