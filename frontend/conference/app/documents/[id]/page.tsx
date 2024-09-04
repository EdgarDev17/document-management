import { NoAuth } from '@/app/components/common/noauth'
import { PDFViewer } from '@/app/components/features/pdf-viewer'
import { auth } from '@/auth'
import { apiClient } from '@/lib/api-service'

async function getRubric(conferenceId: number, token: string) {
	try {
		const res = await apiClient.get(
			`/Conference/ListEvaluationCriteriaByConference?conferenceID=${conferenceId}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)

		console.log('RUBRICA', res.data.conference)
		return res.data.conference
	} catch (error) {
		console.log(error)
		return null
	}
}

async function getDocumentById(id: string, token: string) {
	try {
		const res = await apiClient.get(
			`/document/getdocumentsbydocumentid?documentID=${id}`,
			{
				headers: {
					'Authorization-token': token,
				},
			}
		)

		return res.data.document[0]
	} catch (error) {}
}

export default async function Page({
	params,
	searchParams,
}: {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const session = await auth()

	if (!session) {
		return <NoAuth />
	}

	const paper = await getDocumentById(params.id, session.accessToken)
	const rubric = await getRubric(
		// @ts-ignore
		parseInt(searchParams.conferenceID),
		session.accessToken
	)

	return (
		<div className='w-full md:container mx-auto py-8'>
			<PDFViewer
				rubric={rubric}
				topicsID={paper.topicsID}
				documentID={paper.documentID}
				token={session.accessToken}
				pdfBase64={paper.documentBase}
			/>
		</div>
	)
}
