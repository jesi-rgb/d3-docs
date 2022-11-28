import { error } from '@sveltejs/kit';

export function load({ params }) {
	if (params.slug) {
		return {
			title: params.slug,
			content: params.slug + ' inner slug'
		};
	}
	throw error(404, 'Not found');
}
