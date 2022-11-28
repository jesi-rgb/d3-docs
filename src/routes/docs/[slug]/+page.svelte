<script>
	//  slug
	import { marked } from 'marked';
	export let data;
</script>

<h1 class="text-6xl">{data.title}</h1>
<p>{@html marked(data.content)}</p>
