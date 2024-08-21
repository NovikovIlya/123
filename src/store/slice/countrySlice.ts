import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import endpoints from '../../api/endpoints'

import { ICountryRequest } from './../../api/types'

export const countriesAPi = createApi({
	reducerPath: 'countriesAPi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://egp.kpfu.ru/user-api' }),
	endpoints: build => ({
		getCountries: build.query<ICountryRequest[], void>({
			query: () => ({
				url: endpoints.USER.COUNTRIES,
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
					'Accept-Language': 'en'
				}
			})
		})
	})
})

export const { useGetCountriesQuery } = countriesAPi
