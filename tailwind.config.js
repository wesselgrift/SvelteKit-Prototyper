import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: {
				  default: '#2563EB', // Hex for blue-600
				  hover: '#1D4ED8',   // Hex for blue-700
				},
			  },
		}
	},

	plugins: [typography, forms, containerQueries]
};
