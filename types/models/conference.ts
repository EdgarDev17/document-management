export interface Conference {
	conferenceID: number
	userID: number | null
	conference_name: string
	conference_type: string
	description: string
	conference_RegDate: string
	beggingDate: string
	finishDate: string
	documentAttempt: number
	institutionID: number
	status: number
	location: string | null
	urlconference: string | null
	institution_name: string
	institution_website: string
	institution_contact_phone: string
	rolID: number
	totalCupos: number | null
	totalRegistrados: number | null
}
