import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

import AuthRegReducer from './reducers/AuthRegReducer'
import AddressReducer from './reducers/FormReducers/AddressReducer'
import DocumentReducer from './reducers/FormReducers/DocumentReducer'
import EducationReducer from './reducers/FormReducers/EducationReducer'
import FormReducer from './reducers/FormReducers/FormReducer'
import InfoUserReducer from './reducers/FormReducers/InfoUserReducer'
import ParentReducer from './reducers/FormReducers/ParentReducer'
import WorkReducer from './reducers/FormReducers/WorkReducer'
import ProfileReducer from './reducers/ProfileReducer'
import { acadPerfApi } from './slice/acadPerfSlice'
import { countriesAPi } from './slice/countrySlice'
import { documentsAPi } from './slice/documentSlice'
import { educationLevelAPi } from './slice/educationLevelSlice'
import { passwordApi } from './slice/passwordSlice'
import { scheduleApi } from './slice/scheduleSlice'
import { studyPlanApi } from './slice/studyPlanSlice'
import { abiturientApi } from './api/abitRedirect'

export const store = configureStore({
	reducer: {
		AuthReg: AuthRegReducer,
		Profile: ProfileReducer,
		InfoUser: InfoUserReducer,
		Form: FormReducer,
		Document: DocumentReducer,
		Education: EducationReducer,
		Work: WorkReducer,
		Parent: ParentReducer,
		Address: AddressReducer,
		[scheduleApi.reducerPath]: scheduleApi.reducer,
		[passwordApi.reducerPath]: passwordApi.reducer,
		[countriesAPi.reducerPath]: countriesAPi.reducer,
		[educationLevelAPi.reducerPath]: educationLevelAPi.reducer,
		[documentsAPi.reducerPath]: documentsAPi.reducer,
		[acadPerfApi.reducerPath]: acadPerfApi.reducer,
		[studyPlanApi.reducerPath]: studyPlanApi.reducer,
		[abiturientApi.reducerPath]: abiturientApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(...(process.env.NODE_ENV !== 'production' ? [logger] : []))
			.concat(scheduleApi.middleware)
			.concat(countriesAPi.middleware)
			.concat(educationLevelAPi.middleware)
			.concat(documentsAPi.middleware)
			.concat(studyPlanApi.middleware)
			.concat(acadPerfApi.middleware)
			.concat(passwordApi.middleware)
			.concat(abiturientApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
