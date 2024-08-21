import { AboutUniversity } from '../cards/AboutUniversity'
import { Apply } from '../cards/Apply'
import { Grade } from '../cards/Grade'
import { Schedule } from '../cards/Schedule'
import { Session } from '../cards/Session'

export const studElements = [
	{
		index: '0',
		element: <Schedule />
	},
	{
		index: '1',
		element: <AboutUniversity />
	},
	{
		index: '2',
		element: <Grade />
	},
	{
		index: '3',
		element: <Session />
	}
]

export const anotherElements = [
	{
		index: '0',
		element: <Apply />
	},
	{
		index: '1',
		element: <AboutUniversity />
	}
]
