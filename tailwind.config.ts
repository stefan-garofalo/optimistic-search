import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./feat/**/*.{js,ts,jsx,tsx,mdx}',
		'./ui/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			spacing: {
				container: 'var(--container)'
			},
			colors: {
				background: {
					DEFAULT: 'var(--background)',
					secondary: 'var(--background-secondary)'
				},
				foreground: 'var(--foreground)',
				error: 'var(--error)',
				border: {
					DEFAULT: 'var(--border)',
					active: 'var(--border-active)'
				}
			}
		}
	},
	corePlugins: {
		container: false
	},
	plugins: []
}
export default config
