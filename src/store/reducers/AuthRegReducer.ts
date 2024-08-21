import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IAuthRegState, IAuthSuccess, IError } from '../../api/types'
import { RootState } from '../index'

interface IloginSuccess extends Omit<IAuthSuccess, 'user'> {}

const initialState: IAuthRegState = {
	authData: {
		accessToken: null,
		error: null
	},
	regData: {
		error: null
	}
}

export const AuthRegReducer = createSlice({
	name: 'AuthRegReducer',
	initialState,
	reducers: {
		loginSuccess: (state, action: PayloadAction<IloginSuccess>) => {
			state.authData.accessToken = action.payload.accessToken
			state.authData.error = null
		},
		refreshSuccess: (state, action: PayloadAction<string>) => {
			state.authData.accessToken = action.payload
		},
		loginFailure: (state, action: PayloadAction<IError | null>) => {
			state.authData.error = action.payload
		},
		registrationFailure: (state, action: PayloadAction<IError | null>) => {
			state.regData.error = action.payload
		},
		setDefaultAuthReg: (state, action: PayloadAction<void>) =>
			(state = initialState)
	}
})

export const {
	loginFailure,
	loginSuccess,
	registrationFailure,
	setDefaultAuthReg,
	refreshSuccess
} = AuthRegReducer.actions

export default AuthRegReducer.reducer

export const selectState = (state: RootState) => state.AuthReg
