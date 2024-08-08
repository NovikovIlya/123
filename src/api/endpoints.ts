const endpoints = {
	LOGIN: '/user-api/login',
	REFRESH: '/user-api/token/refresh',
	REG: {
		REGISTER: '/user-api/register',
		APPROVE: '/user-api/register/approve'
	},
	USER: {
		INFO: {
			ROLE: '/user-api/users/me/role',
			DOCUMENT: '/user-api/users/me/document',
			EDUCATION: '/user-api/users/me/education',
			PARENT: '/user-api/users/me/parent',
			JOB: {
				JOB: '/user-api/users/me/work-history',
				JOBITEM: '/user-api/users/me/work-history/items'
			},
			FORM: '/user-api/users/me',
			ADDRESS: '/user-api/users/me/address',
			SCHEDULE: '/schedule',
			EXAM_SCHEDULE: '/examsSchedule',
			PERFORMANCE: '/performance',
			TEACHERS_RATING: '/teachers-rating'
		},
		COUNTRIES: '/country',
		EDUCATION_LEVEL_ANOTHER: '/education/levels',
		EDUCATION_LEVEL_STUD: '/student/institution',
		DOCUMENTS: '/document',
		ADMISSION: '/user-api/admission-link'
	}
}

export default endpoints
