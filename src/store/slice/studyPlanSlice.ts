import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import endpoints from '../../api/endpoints'
import { Exam, ICalendar } from '../../api/types'

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://egp.kpfu.ru/study-plan-api/studyplan',
	prepareHeaders: headers => {
		const accessToken = localStorage.getItem('access')
		if (accessToken) {
			headers.set('Authorization', `Bearer ${accessToken}`)
			headers.set('Content-Type', 'application/json')
		}

		return headers
	}
})
export const studyPlanApi = createApi({
	reducerPath: 'studyPlanApi',
	baseQuery,
	endpoints: builder => ({
		getExamsSchedule: builder.query<Exam[], void>({
			query: () => `/examsSchedule`
		}),
		getStudyPlan: builder.query<ICalendar, void>({
			query: () => ''
		})
	})
})

export const { useGetExamsScheduleQuery, useGetStudyPlanQuery } = studyPlanApi
