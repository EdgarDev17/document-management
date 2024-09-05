import { NoAuth } from '@/app/components/common/noauth'
import { PDFViewer } from '@/app/components/features/pdf-viewer-general'
import { auth } from '@/auth'
import { apiClient } from '@/lib/api-service'

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
	} catch (error) {
		return []
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	const session = await auth()

	if (!session) {
		return <NoAuth />
	}

	const paper = await getDocumentById(params.id, session.accessToken)

	return (
		<div className='w-full md:container mx-auto py-8'>
			<PDFViewer pdfBase64={paper.documentBase} />
		</div>
	)
}
