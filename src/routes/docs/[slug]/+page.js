import { error } from '@sveltejs/kit';
import { arrayPairs } from '../../../lib/utils';

export async function load({ fetch, params }) {
	const urlPrefix = 'https://raw.githubusercontent.com/d3/';
	const version = '/v3.2.0';
	const fullUrl = urlPrefix + params.slug + version + '/README.md';

	if (params.slug) {
		const fetchDocs = await (await fetch(fullUrl)).text();

		const sectionRegex = /#{2,3} \w*/g;
		const functionHeaderRegex = /<a name="\w*" href="#\w*">#<\/a>/g;

		let sections = Array.from(fetchDocs.matchAll(sectionRegex));
		let sectionIndicesPairs = arrayPairs(sections.map((s) => s.index));
		let sectionChunks = sectionIndicesPairs.map((p) => fetchDocs.slice(p[0], p[1]));

		let fullParsedData = Array.from(
			sectionChunks.map((section, i) => {
				let sectionName = sections[i][0].replace(/#* /, '');
				let functions = Array.from(section.matchAll(functionHeaderRegex));
				let functionNames = functions.map((h) => h[0].match(/#\w*/g)[0].replace('#', ''));

				let indexPairs = arrayPairs(functions.map((f) => f.index));
				let descriptions = indexPairs.map((p) => section.slice(p[0], p[1]));

				let funcAndDesc = functionNames.map((f, i) => {
					return {
						function: f,
						description: descriptions[i]
					};
				});

				return {
					section: sectionName,
					functions: funcAndDesc
				};
			})
		);

		let data = fullParsedData.filter((a) => a.functions.length > 0);

		return {
			title: params.slug,
			content: fetchDocs,
			data: data
		};
	}
	throw error(404, 'Not found');
}
