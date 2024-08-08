import { useAppSelector } from '..'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import endpoints from '../../api/endpoints'

import { IEducationLevelRequest, TypeRole } from './../../api/types'

export const educationLevelAPi = createApi({
	reducerPath: 'educationLevelAPi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://egp.kpfu.ru/user-api' }),
	endpoints: build => ({
		getEducationLevel: build.query<IEducationLevelRequest[], TypeRole>({
			query: role => ({
				url:
					role === 'STUD'
						? endpoints.USER.EDUCATION_LEVEL_STUD
						: endpoints.USER.EDUCATION_LEVEL_ANOTHER,
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'Accept-Language': 'en'
				}
			})
		})
	})
})

export const { useGetEducationLevelQuery } = educationLevelAPi
