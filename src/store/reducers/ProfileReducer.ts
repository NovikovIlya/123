import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IError, IProfileState, IUserData } from '../../api/types'
import { RootState } from '../index'

const initialState: IProfileState = {
	profileData: {
		error: null,
		CurrentData: null
	}
}

export const ProfileReducer = createSlice({
	name: 'Profile',
	initialState,
	reducers: {
		ProfileSuccess: (state, action: PayloadAction<IUserData>) => {
			state.profileData.CurrentData = action.payload
			state.profileData.error = null
		},
		setDefaultProfile: (state, action: PayloadAction<void>) =>
			(state = initialState)
	}
})

export const { ProfileSuccess, setDefaultProfile } = ProfileReducer.actions

export default ProfileReducer.reducer

export const selectState = (state: RootState) => state.Profile
