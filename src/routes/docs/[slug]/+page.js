import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const urlPrefix = 'https://raw.githubusercontent.com/d3/';
	const version = '/v3.2.0';
	const fullUrl = urlPrefix + params.slug + version + '/README.md';
	console.log(fullUrl);
	if (params.slug) {
		const fetchDocs = await (await fetch(fullUrl)).text();
		console.log(fetchDocs);

		//TODO: now we should somehow split the docs here and create links and shit

		const regex = /<a name="\w*" href="#\w*">#<\/a>/g;
		// const regexObj = RegExp(/<a name="\w*" href="#\w*">#<\/a>/, 'g');

		// let matches = fetchDocs.match(regex);
		console.log(fetchDocs.matchAll(regex));
		let matches = Array.from(fetchDocs.matchAll(regex));

		console.log(matches);
		return {
			title: params.slug,
			content: fetchDocs
		};
	}
	throw error(404, 'Not found');
}
