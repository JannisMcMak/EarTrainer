<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="p-8">
	<h1 class="text-3xl font-bold">Ear Trainer</h1>
	{@render children()}
</div>
