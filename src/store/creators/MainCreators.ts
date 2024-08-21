import { Dispatch } from '@reduxjs/toolkit'
import request from 'axios'
import { Cookies } from 'react-cookie'

import {
	addEducation,
	addJobItem,
	approve,
	deleteEducation,
	deleteJobItem,
	deleteParent,
	getAddress,
	getAdmissionLink,
	getDocument,
	getEducation,
	getForm,
	getJob,
	getParent,
	getRole,
	login,
	postDocument,
	postParent,
	putAddress,
	putEducation,
	putForm,
	putParent,
	putPortfolioLink,
	refresh,
	register,
	role,
	updateJobItem
} from '../../api/index'
import {
	AbUSParentResponse,
	IAddress,
	IAddressRequest,
	IDocument,
	IDocumentAbUs,
	IEducationState,
	IError,
	IParent,
	IRole,
	educationItem,
	formItem,
	workItem
} from '../../api/types'
import { IApproveRequest, IAuthRequest, IRegRequest } from '../../api/types'
import {
	loginFailure,
	loginSuccess,
	refreshSuccess,
	registrationFailure
} from '../reducers/AuthRegReducer'
import { ProfileSuccess } from '../reducers/ProfileReducer'

import { IWorkState } from './../../api/types'
import { LogOut } from './SomeCreators'

const cookies = new Cookies()

export const loginUser = async (
	data: IAuthRequest,
	dispatch: Dispatch
): Promise<any> => {
	try {
		const pass = data.password
		localStorage.setItem('password', JSON.stringify(pass))
		const res = await login(data)

		dispatch(
			loginSuccess({
				accessToken: res.data.accessToken,
				refreshToken: res.data.refreshToken
			})
		)
		document.cookie = `refresh=${
			res.data.refreshToken
		}; max-age=31536000; domain=${
			document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
		}; path=/; samesite=strict`
		document.cookie = `s_id=${
			res.data.user.sessionId
		}; max-age=31536000; domain=${
			document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
		}; path=/; samesite=strict`
		document.cookie = `h_id=${
			res.data.user.sessionHash
		}; max-age=31536000; domain=${
			document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
		}; path=/; samesite=strict`
		const isEmol = res.data.user.roles.filter((item: any) => {
			return item.type === 'EMPL'
		})
		if (isEmol.length === 0) {
		}
		localStorage.setItem('access', res.data.accessToken)
		localStorage.setItem('userInfo', JSON.stringify(res.data.user))
		dispatch(ProfileSuccess(res.data.user))
		return res
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			dispatch(loginFailure(e.response?.data as IError))
		}
		return 403
	}
}

export const refreshToken = async (dispatch: Dispatch): Promise<200 | 403> => {
	let accessToken = localStorage.getItem('access')
	let userData = localStorage.getItem('userInfo')

	if (accessToken == null || userData == null) {
		LogOut(dispatch)
		return 403
	}

	try {
		dispatch(ProfileSuccess(JSON.parse(localStorage.getItem('userInfo') || '')))
		await refresh({
			refreshToken: accessToken
		})
		return 200
	} catch (e) {
		try {
			const res = await refresh({
				refreshToken: cookies.get('refresh')
			})
			localStorage.removeItem('access')
			localStorage.setItem('access', res.data.accessToken)
			dispatch(refreshSuccess(res.data.accessToken))
			return 200
		} catch (e) {
			LogOut(dispatch)
			return 403
		}
	}
}

export const registerUser = async (
	data: IRegRequest,
	dispatch: Dispatch
): Promise<200 | 400> => {
	try {
		await register(data)
		return 200
	} catch (e) {
		if (request.isAxiosError(e) && e.response) {
			dispatch(registrationFailure(e.response?.data as IError))
		}
		return 400
	}
}

export const approveEmail = async (
	data: IApproveRequest,
	dispatch: Dispatch
): Promise<200 | 403> => {
	try {
		const res = await approve(data)
		document.cookie = `refresh=${
			res.data.refreshToken
		}; max-age=31536000; domain=${
			document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
		}; path=/; samesite=strict`
		document.cookie = `s_id=${
			res.data.user.sessionId
		}; max-age=31536000; domain=${
			document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
		}; path=/; samesite=strict`
		document.cookie = `h_id=${
			res.data.user.sessionHash
		}; max-age=31536000; domain=${
			document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
		}; path=/; samesite=strict`
		localStorage.setItem('userInfo', JSON.stringify(res.data.user))
		localStorage.setItem('access', res.data.accessToken)
		dispatch(
			loginSuccess({
				accessToken: res.data.accessToken,
				refreshToken: res.data.refreshToken
			})
		)
		dispatch(ProfileSuccess(res.data.user))
		return 200
	} catch (e) {
		return 403
	}
}

export const setRole = async (
	data: IRole,
	dispatch: Dispatch
): Promise<200 | 403 | 404> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await role(data)
		return 200
	} catch (e) {
		return 404
	}
}

export const GetRole = async (
	dispatch: Dispatch
): Promise<IRole[] | 404 | 403> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		const response = await getRole()
		return response.data
	} catch (e) {
		return 404
	}
}

export const getAbUsForm = async (
	dispatch: Dispatch
): Promise<formItem | 403 | 404> => {
	let response = null
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		response = await getForm()
		return response.data
	} catch (e) {
		return 404
	}
}

export const getAbUsAddress = async (
	dispatch: Dispatch
): Promise<IAddress | 403 | 404> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		const response = await getAddress()
		return response.data
	} catch (e) {
		return 404
	}
}

export const getAbUsJob = async (
	dispatch: Dispatch
): Promise<IWorkState | 403 | 404> => {
	let response = null
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		response = await getJob().then(response => response.data)
		return response
	} catch (e) {
		return 404
	}
}

export const putAbUsForm = async (
	data: formItem,
	dispatch: Dispatch
): Promise<200 | 403 | 404> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await putForm(data)
		return 200
	} catch (e) {
		return 404
	}
}

export const putAbUsAddress = async (
	data: IAddressRequest,
	dispatch: Dispatch
): Promise<200 | 403 | 404> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await putAddress(data)
		return 200
	} catch (e) {
		return 404
	}
}

export const portfolioLinkRequest = async (
	data: { portfolioLink: string },
	dispatch: Dispatch
): Promise<200 | 404 | 403> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await putPortfolioLink(data)
		return 200
	} catch (e) {
		return 404
	}
}

export const deleteJobItemRequest = async (
	id: string,
	dispatch: Dispatch
): Promise<200 | 403 | 404> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await deleteJobItem(id)
		return 200
	} catch (e) {
		return 404
	}
}

export const updateJobItemRequest = async (
	id: string,
	data: workItem,
	dispatch: Dispatch
): Promise<200 | 404 | 403> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await updateJobItem(id, data)
		return 200
	} catch (e) {
		return 404
	}
}

export const addJobItemRequest = async (
	data: workItem,
	dispatch: Dispatch
): Promise<200 | 404 | 403> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await addJobItem(data)
		return 200
	} catch (e) {
		return 404
	}
}

export const deleteEducationItemRequest = async (
	id: string,
	dispatch: Dispatch
): Promise<200 | 403 | 404> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await deleteEducation(id)
		return 200
	} catch (e) {
		return 404
	}
}

export const putEducationItemRequest = async (
	id: string,
	data: educationItem,
	dispatch: Dispatch
): Promise<200 | 403 | 404> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await putEducation(id, data)
		return 200
	} catch (e) {
		return 404
	}
}

export const getEducationItemRequest = async (
	dispatch: Dispatch
): Promise<IEducationState[] | 404 | 403> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		const response = await getEducation()
		return response.data
	} catch (e) {
		return 404
	}
}

export const addEducationItemRequest = async (
	data: educationItem,
	dispatch: Dispatch
): Promise<200 | 403 | 404> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await addEducation(data)
		return 200
	} catch (e) {
		return 404
	}
}

export const putParentItemRequest = async (
	id: string,
	data: IParent,
	dispatch: Dispatch
): Promise<200 | 403 | 404> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await putParent(id, data)
		return 200
	} catch (e) {
		return 404
	}
}

export const getParentItemRequest = async (
	dispatch: Dispatch
): Promise<AbUSParentResponse[] | 404 | 403> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		const response = await getParent()
		return response.data
	} catch (e) {
		return 404
	}
}

export const deleteParentItemRequest = async (
	id: string,
	dispatch: Dispatch
): Promise<200 | 403 | 404> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await deleteParent(id)
		return 200
	} catch (e) {
		return 404
	}
}

export const postParentItemRequest = async (
	data: IParent,
	dispatch: Dispatch
): Promise<200 | 404 | 403> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await postParent(data)
		return 200
	} catch (e) {
		return 404
	}
}

export const postDocumentItemRequest = async (
	data: IDocument,
	dispatch: Dispatch
): Promise<200 | 404 | 403> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		await postDocument(data)
		return 200
	} catch (e) {
		return 404
	}
}

export const getDocumentItemRequest = async (
	dispatch: Dispatch
): Promise<IDocumentAbUs | 404 | 403> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		const response = await getDocument()
		return response.data
	} catch (e) {
		return 404
	}
}

export const getAdmission = async (
	dispatch: Dispatch
): Promise<
	| {
			link: string
	  }
	| 404
	| 403
> => {
	try {
		if ((await refreshToken(dispatch)) === 403) return 403
		const response = await getAdmissionLink()
		debugger
		cookies.remove('s_id', { domain: 'kpfu.ru', path: '/' })
		cookies.remove('s_abit_id', { domain: 'kpfu.ru', path: '/' })
		cookies.set('s_id', response.data.session, { domain: 'kpfu.ru', path: '/' })
		cookies.set('s_abit_id', response.data.session, {
			domain: 'kpfu.ru',
			path: '/'
		})
		return response.data
	} catch (e) {
		return 404
	}
}
