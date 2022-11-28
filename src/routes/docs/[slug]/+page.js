import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const urlPrefix = 'https://raw.githubusercontent.com/d3/';
	const version = '/v3.2.0';
	const fullUrl = urlPrefix + params.slug + version + '/README.md';
	console.log(fullUrl);
	if (params.slug) {
		const fetchDocs = await (await fetch(fullUrl)).text();

		//TODO: now we should somehow split the docs here and create links and shit
		return {
			title: params.slug,
			content: fetchDocs
		};
	}
	throw error(404, 'Not found');
}
