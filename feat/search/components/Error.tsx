import { ApiError } from '../types'

export default function Error({
	status,
	statusText,
	message,
	documentation_url
}: ApiError) {
	return (
		<div className="h-fit flex flex-col gap-y-2 p-4 rounded-md bg-background border">
			<div className="flex items-center gap-x-3">
				<h3 className="text-xl font-bold text-error">Error encountered!</h3>
				<div className="flex items-start gap-x-1">
					<span className="font-bold">{status} - </span>
					<span>{statusText}</span>
				</div>
			</div>
			<div className="flex flex-col gap-y-1">
				<span>{message}</span>
				<a
					href={documentation_url}
					target="_blank"
					className="hover:opacity-50 transition-opacity duration-300"
				>
					<span className="underline">Learn more</span>
				</a>
			</div>
		</div>
	)
}
