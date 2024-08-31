export interface Conference {
	conferenceID: number // Identificador único para la conferencia
	conference_name: string // Nombre de la conferencia
	type: string // Tipo de conferencia
	description?: string // Descripción de la conferencia (opcional)
	DateModified?: Date // Fecha de última modificación (opcional)
	RegDate?: Date // Fecha de registro (opcional, por defecto la fecha actual)
	beggingDate: Date // Fecha de inicio de la conferencia
	finishDate: Date // Fecha de finalización de la conferencia
	documentAttempt?: number // Número de intentos de documento (opcional)
	institutionID: number // ID de la institución a la que pertenece la conferencia
	Status: number // Estado de la conferencia
	rolID: number // ID del rol de usuario en la conferencia
	userID: number // ID del usuario que creó o es responsable de la conferencia
}
