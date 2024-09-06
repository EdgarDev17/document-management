import { auth } from '@/auth'
import PaginaAnalisis from './analytics-container'
import { apiClient } from '@/lib/api-service'
import { NoAuth } from '@/app/components/common/noauth'

async function obtenerConferencias(token: string) {
	try {
		const response = await apiClient.get(
			'/Conference/GetConferencesByAdminID',
			{
				params: { userID: 1 },
				headers: {
					'Authorization-Token': token,
				},
			}
		)
		return response.data
	} catch (error) {
		console.error('Error al obtener conferencias:', error)
		throw new Error('No se pudieron cargar las conferencias')
	}
}

async function obtenerTemas(conferenceID: number, token: string) {
	try {
		const response = await apiClient.get(
			'/Conference/ConferencesListTopicsByConferenceID',
			{
				params: { conferenceID },
				headers: {
					'Authorization-Token': token,
				},
			}
		)
		return response.data
	} catch (error: any) {
		if (error.response && error.response.status === 409) {
			console.warn(
				`Conflicto (409) al obtener temas para la conferencia ${conferenceID}`
			)
			return { topics: [] }
		}
		console.error(
			`Error al obtener temas para la conferencia ${conferenceID}:`,
			error
		)
		throw error
	}
}

async function obtenerCalificaciones(topicID: number, token: string) {
	try {
		const response = await apiClient.get('/rating/scoretopicspromedio', {
			params: { TopicID: topicID },
			headers: {
				'Authorization-Token': token,
			},
		})
		return response.data
	} catch (error: any) {
		if (error.response && error.response.status === 409) {
			console.warn(
				`Conflicto (409) al obtener calificaciones para el tema ${topicID}`
			)
			return { ratingTopics: null }
		}
		console.error(
			`Error al obtener calificaciones para el tema ${topicID}:`,
			error
		)
		return { ratingTopics: null }
	}
}

export default async function Page() {
	const session = await auth()

	if (!session) {
		return <NoAuth />
	}

	try {
		const datosConferencias = await obtenerConferencias(session?.accessToken)
		const conferencias = datosConferencias.conference

		const promesasTemas = conferencias.map((conf: any) =>
			obtenerTemas(conf.conferenceID, session.accessToken)
		)
		const datosTemas = await Promise.all(promesasTemas)
		const temas = datosTemas.flatMap((data) => data.topics || [])

		const promesasCalificaciones = temas.map((tema) =>
			obtenerCalificaciones(tema.topicsID, session.accessToken)
		)
		const datosCalificaciones = await Promise.all(promesasCalificaciones)
		const calificaciones = datosCalificaciones
			.map((data) => data.ratingTopics)
			.filter(Boolean)

		return (
			<PaginaAnalisis
				conferencias={conferencias}
				temas={temas}
				calificaciones={calificaciones}
			/>
		)
	} catch (error) {
		console.error('Error al cargar los datos de análisis:', error)
		return (
			<div className='p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
				Error al cargar los datos. Por favor, intente de nuevo más tarde.
			</div>
		)
	}
}
