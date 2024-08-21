import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import endpoints from '../../api/endpoints'

import { IDocumentsRequest } from './../../api/types'

export const documentsAPi = createApi({
	reducerPath: 'documentsAPi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://egp.kpfu.ru/user-api/' }),
	endpoints: build => ({
		getDocuments: build.query<IDocumentsRequest[], void>({
			query: () => ({
				url: endpoints.USER.DOCUMENTS,
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'Accept-Language': 'en'
				}
			})
		})
	})
})

export const { useGetDocumentsQuery } = documentsAPi
