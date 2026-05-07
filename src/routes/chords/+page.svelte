<script lang="ts">
	import chords, { type ChordType } from '$lib/chords';
	import { Chord, Note } from 'tonal';
	import * as Tone from 'tone';
	import piano from '$lib/piano';
	import Volume2 from '@lucide/svelte/icons/volume-2';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';

	// Playback
	let selectedChords: number[] = $state([]);
	let currentSetNum: number | undefined = $state();
	let currentChord = $derived(currentSetNum ? Chord.get(currentSetNum.toString()) : undefined);

	let lastUsedTonic = $state('');
	function getRandomTonic() {
		const min = 57; // A3
		const max = 72; // C5
		const randomMidi = Math.floor(Math.random() * (max - min + 1)) + min;
		const tonic = Note.fromMidi(randomMidi);
		lastUsedTonic = tonic;
		return tonic;
	}

	function playCurrentChord(tonic: string) {
		if (!currentChord) return;
		const notes = Chord.notes(currentChord.name, tonic);
		piano.releaseAll();
		piano.triggerAttackRelease(notes, 3);
	}

	function playSelectedChord(tonic: string) {
		if (!selectedChord) return;
		const notes = Chord.notes(selectedChord.name, tonic);
		piano.releaseAll();
		piano.triggerAttackRelease(notes, 3);
	}

	async function start() {
		await Tone.start();

		const sets = selectedChords.length ? selectedChords : chords.all.map((c) => c.setNum);

		currentSetNum = sets[Math.floor(Math.random() * sets.length)];

		playCurrentChord(getRandomTonic());
	}

	// User input
	let selectedChordType: ChordType | undefined = $state();
	let selectedChord: Chord.Chord | undefined = $state();

	function next() {
		selectedChord = undefined;
		selectedChordType = undefined;
		start();
	}
</script>

<h2 class="text-2xl">Chords</h2>

<div class="mt-8">
	{#if currentSetNum && currentChord}
		<div class="card max-w-xl">
			<header>
				<div class="flex items-center space-x-4">
					<h2>What chord is this?</h2>
					<button class="btn-secondary btn-icon" onclick={() => playCurrentChord(lastUsedTonic)}>
						<Volume2 />
					</button>
				</div>
				<p>Tonic: <b>{lastUsedTonic}</b></p>
			</header>

			<section class="flex flex-wrap gap-2">
				{#if !selectedChordType}
					{#each chords.types as chordType (chordType)}
						<button class="btn" onclick={() => (selectedChordType = chordType)}>
							{chordType}
						</button>
					{/each}
				{:else if !selectedChord}
					<button class="btn-icon" onclick={() => (selectedChordType = undefined)}>
						<ChevronLeft />
					</button>
					{#each chords[selectedChordType] as chord (chord.setNum)}
						<button class="btn btn-secondary" onclick={() => (selectedChord = chord)}>
							{chord.symbol}
						</button>
					{/each}
				{:else}
					{@const correct = selectedChord.chroma === currentChord.chroma}
					<div class="w-full space-y-4">
						<h3 class="text-center text-xl font-bold" class:text-destructive={!correct}>
							{correct ? 'Correct!' : 'Wrong.'}<br />
						</h3>

						<div class="flex justify-around">
							<article
								class="group/item flex min-w-32 flex-col items-center gap-1 rounded-md bg-muted/50 p-4 text-sm"
							>
								<p class="text-muted-foreground">Answer</p>
								<h3 class="text-lg font-bold">{currentChord.symbol}</h3>
								<button class="btn-icon" onclick={() => playCurrentChord(lastUsedTonic)}>
									<Volume2 />
								</button>
							</article>
							{#if !correct}
								<article
									class="group/item flex min-w-32 flex-col items-center gap-1 rounded-md bg-muted/50 p-4 text-sm"
								>
									<p class="text-muted-foreground">You selected</p>
									<h3 class="text-lg font-bold">{selectedChord.symbol}</h3>
									<button class="btn-icon" onclick={() => playSelectedChord(lastUsedTonic)}>
										<Volume2 />
									</button>
								</article>
							{/if}
						</div>

						<div class="flex w-full justify-end">
							<button class="btn" onclick={next}>Next</button>
						</div>
					</div>
				{/if}
			</section>
		</div>
	{:else}
		<button class="btn" onclick={start}>Start</button>
	{/if}
</div>
