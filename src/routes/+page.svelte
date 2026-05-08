<script lang="ts">
	import { resolve } from '$app/paths';

	const exercises = [{ name: 'Chords', path: '/chords' }] as const;
</script>

<div class="mt-4">
	{#each exercises as exercise (exercise.path)}
		<a href={resolve(exercise.path)} class="btn">{exercise.name}</a>
	{/each}
</div>
