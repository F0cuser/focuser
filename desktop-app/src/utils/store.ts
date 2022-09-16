import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './reducers/modal'
import urlsReducer from './reducers/urls'
import timerReducer from './reducers/timer'
import settingsReducer from './reducers/settings'

const store = configureStore({
    reducer: {
      modal: modalReducer,
      urls: urlsReducer,
      timer: timerReducer,
      settings: settingsReducer
    },
  })
  
export type RootState = ReturnType<typeof store.getState>

export default store

