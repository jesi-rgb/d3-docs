export async function load() {
	let docs = await (await fetch('https://raw.githubusercontent.com/d3/d3/main/API.md')).text();
	console.log(docs);
	return {
		docs
	};
}
