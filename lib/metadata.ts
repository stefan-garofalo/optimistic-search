type Metadata = {
	title: string
	description: string
	image?: {
		src?: string
		width?: number
		height?: number
	}
	canonical: string
}

export function generate({ title, description, image, canonical }: Metadata) {
	return {
		title,
		description,
		metadataBase: new URL(`${process.env.PROD_URL}`),
		alternates: {
			canonical
		},
		openGraph: {
			title,
			description,
			locale: 'en_US',
			type: 'website',
			...(image && image?.src
				? {
						images: [
							{
								url: image.src,
								width: image.width,
								height: image.height
							}
						]
				  }
				: {})
		}
	}
}
