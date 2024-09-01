import { PDFViewer } from '@/app/components/features/pdf-viewer'
const rubricData = {
	_ResponseEvaluationD: {
		_Evalutioncriteria: [
			{
				criterionID: 1,
				aspect: 'Titulo',
				description:
					'Correspondencia del Titulo con el contenido del documento,su sintaxis debe ser clara,explicativa y concisa',
			},
			{
				criterionID: 2,
				aspect: 'Resumen',
				description:
					'Dar cuenta de manera breve, el problema, los metodos utilizados y conclusiones',
			},
			{
				criterionID: 3,
				aspect: 'Originalidad',
				description:
					'Debe ser inedito y producto de investigacion(Argumentos teoricos y metodologicos) ',
			},
			{
				criterionID: 4,
				aspect: 'Organización Interna ',
				description:
					'Debe estar presentado con un nivel de coherencia, facilidad de lectura, fomento de la discusión, uso correcto del lenguaje y enlace adecuados entre párrafos y secciones',
			},
			{
				criterionID: 5,
				aspect: 'Introducción',
				description:
					'Narrar el planteamiento del problema, propósito de la investigación, consideraciones teóricas y objetivos de investigación ',
			},
			{
				criterionID: 6,
				aspect: 'Método',
				description:
					'Valoración de la estructura y coherencia de la metodología empleada.',
			},
			{
				criterionID: 7,
				aspect: 'Resultados',
				description:
					'Presentación concreta, adecuada y coherente de los resultados',
			},
			{
				criterionID: 8,
				aspect: 'Tablas y gráficos',
				description:
					'Análisis de los datos a través de tablas y gráficos evitando la redundancia innecesaria',
			},
			{
				criterionID: 9,
				aspect: 'Conclusiones',
				description:
					'Responder los objetivos de la investigación, no deben repetir los resultados, verificando el impacto de los planteamientos realizados dentro de los términos de su contribución',
			},
			{
				criterionID: 10,
				aspect: 'Referencias Bibliográficas',
				description: 'Correspondencia con las referencias citadas en el texto',
			},
		],
		_Evalutionscale: [
			{
				scaleID: 1,
				scale: 'A',
				description: 'Se cumple adecuadamente',
			},
			{
				scaleID: 2,
				scale: 'B',
				description: 'Se cumple parcialmente',
			},
			{
				scaleID: 3,
				scale: 'C',
				description: 'No se cumple ',
			},
		],
	},
}

export default async function Page({ params }: { params: { id: string } }) {
	return (
		<div className='w-full py-8'>
			<PDFViewer rubric={rubricData} pdfBase64='' />
		</div>
	)
}
