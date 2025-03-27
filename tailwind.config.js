import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Geist','system-ui', 'sans-serif'],
			},
            borderRadius: {
                card: 'var(--card-radius)',
                interactive: 'var(--interactive-radius)'
            },
			colors: {
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				background: 'hsl(var(--background))',
				border: 'hsl(var(--border))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				foreground: 'hsl(var(--foreground))',
				input: 'hsl(var(--input))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				ring: 'hsl(var(--ring))',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: {
                        DEFAULT: 'hsl(var(--sidebar-primary))',
                        foreground: 'hsl(var(--sidebar-primary-foreground))',
                    },
                    accent: {
                        DEFAULT: 'hsl(var(--sidebar-accent))',
                        foreground: 'hsl(var(--sidebar-accent-foreground))',
                    },
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
			},
		}
	},

	plugins: [typography, forms, containerQueries]
};
