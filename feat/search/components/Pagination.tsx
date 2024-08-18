import { ButtonPrimary } from '@/feat/UI/Buttons'
import IconArrow from '@/feat/UI/Icons/Arrow'

export default function Pagination({ page }: { page: number }) {
	return (
		<div className="flex items-center gap-x-2">
			<ButtonPrimary>
				<IconArrow className="size-5 rotate-180" />
				<span className="sr-only">Prev</span>
			</ButtonPrimary>
			<ButtonPrimary>
				<IconArrow className="size-5" />
				<span className="sr-only">Next</span>
			</ButtonPrimary>
			<div className="text-sm text-foreground">Page {page}</div>
		</div>
	)
}
