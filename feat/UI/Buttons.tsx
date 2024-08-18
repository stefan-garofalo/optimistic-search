import { merge } from '@/lib/tailwind'
import { ClassValue } from 'clsx'

type ButtonProps = {
	onClick?: () => void
	className?: ClassValue
	children: React.ReactNode
}

export function ButtonPrimary({ onClick, className, children }: ButtonProps) {
	return (
		<button
			className={merge(
				'p-2.5 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground rounded-md transition-colors duration-300',
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
