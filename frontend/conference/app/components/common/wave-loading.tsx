export function WaveLoading() {
	return (
		<div>
			<div className='flex space-x-2'>
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className='w-4 h-4 bg-primary rounded-full'
						style={{
							animation: `waveLoader 1s ease-in-out ${i * 0.1}s infinite`,
						}}
					/>
				))}
			</div>
		</div>
	)
}
