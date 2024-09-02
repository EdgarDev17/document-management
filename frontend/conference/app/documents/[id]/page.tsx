import { NoAuth } from '@/app/components/common/noauth'
import { PDFViewer } from '@/app/components/features/pdf-viewer'
import { auth } from '@/auth'
import { apiClient } from '@/lib/api-service'

async function getRubric(documentId: number, token: string) {
	try {
		const res = await apiClient.get(
			`/Conference/ListEvaluationCriteriaByConference?conferenceID=${documentId}`,
			{
				headers: {
					'Authorization-Token': token,
				},
			}
		)

		return res.data.conference
	} catch (error) {
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

export default async function Page({ params }: { params: { id: string } }) {
	const session = await auth()

	if (!session) {
		return <NoAuth />
	}

	const paper = await getDocumentById(params.id, session.accessToken)
	const rubric = await getRubric(17, session.accessToken)

	console.log('paper ->', paper)
	console.log('rubruca->', rubric)
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
