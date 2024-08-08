import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import endpoints from '../../api/endpoints'
import { IPerformance, ITeacher, ITeacherItem } from '../../api/types'

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://egp.kpfu.ru/academic-performance-api',
	prepareHeaders: headers => {
		const accessToken = localStorage.getItem('access')
		if (accessToken) {
			headers.set('Authorization', `Bearer ${accessToken}`)
			headers.set('Content-Type', 'application/json')
		}

		return headers
	}
})
export const acadPerfApi = createApi({
	reducerPath: 'acadPerfApi',
	baseQuery,
	endpoints: builder => ({
		getPerformance: builder.query<IPerformance, void>({
			query: () => endpoints.USER.INFO.PERFORMANCE
		}),
		getTeacher: builder.query<ITeacher[], void>({
			query: () => endpoints.USER.INFO.TEACHERS_RATING
		}),
		getCurTeacher: builder.query<ITeacherItem, string>({
			query: id => endpoints.USER.INFO.TEACHERS_RATING + '/' + id
		}),
		setTeacherRating: builder.mutation<void, { body: ITeacher; id: number }>({
			query: arg => ({
				url: endpoints.USER.INFO.TEACHERS_RATING + '/' + arg.id,
				method: 'POST',
				body: arg.body
			})
		})
	})
})

export const {
	useGetPerformanceQuery,
	useGetTeacherQuery,
	useGetCurTeacherQuery,
	useSetTeacherRatingMutation
} = acadPerfApi
