import { merge } from '@/lib/tailwind'
import { ClassValue } from 'clsx'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: ClassValue
	children: React.ReactNode
	onClick?: () => void
}

export function ButtonPrimary({
	onClick,
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			className={merge(
				'p-2.5 bg-background border border-border hover:border-border-active rounded-md transition-all duration-300',
				'disabled:opacity-40 disabled:cursor-not-allowed',
				'data-[pending]:animate-pulse',
				className
			)}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	)
}
