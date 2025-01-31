import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'color-background': {
					DEFAULT: colors.white
				},
				'color-foreground': {
					DEFAULT: colors.black
				},
				'color-card': {
					DEFAULT: colors.white
				},
				'color-card-foreground': {
					DEFAULT: colors.black
				},
				'color-navbar': {
					DEFAULT: colors.gray[50]
				},
				'color-navbar-foreground': {
					DEFAULT: colors.black
				},
				'color-popover': {
					DEFAULT: colors.white
				},
				'color-popover-foreground': {
					DEFAULT: colors.black
				},
				'color-primary': {
					DEFAULT: colors.blue[600],
					hover: colors.blue[700],
				},
				'color-primary-foreground': {
					DEFAULT: colors.white
				},
				'color-secondary': {
					DEFAULT: colors.white,
					hover: colors.gray[50],
				},
				'color-secondary-foreground': {
					DEFAULT: colors.black
				},
				'color-muted': {
					DEFAULT: colors.gray[200],
					hover: colors.gray[300],
				},
				'color-muted-foreground': {
					DEFAULT: colors.gray[500],
				},
				'color-accent': {
					DEFAULT: colors.gray[200],
					hover: colors.gray[300],
				},
				'color-accent-foreground': {
					DEFAULT: colors.black
				},
				'color-success': {
					DEFAULT: colors.green[500],
					hover: colors.green[600],
				},
				'color-success-foreground': {
					DEFAULT: colors.white
				},
				'color-destructive': {
					DEFAULT: colors.red[500],
					hover: colors.red[600],
				},
				'color-destructive-foreground': {
					DEFAULT: colors.white
				},
				'color-border': {
					DEFAULT: colors.gray[200],
				},
				'color-input': {
					DEFAULT: colors.gray[200],
				},
				'color-ring': {
					DEFAULT: colors.blue[600],
				},
			},
		}
	},

	plugins: [typography, forms, containerQueries]
};
