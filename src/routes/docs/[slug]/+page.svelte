<script>
	//  slug
	import { marked } from 'marked';
	export let data;
	console.log(data.content);
</script>

<h1 class="text-6xl">{data.title}</h1>
<p>{@html marked(data.content)}</p>
