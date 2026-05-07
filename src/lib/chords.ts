import { Chord, ChordType } from 'tonal';

export type ChordType = 'major' | 'minor' | 'dominant';

ChordType.add(['1P', '3M', '4A', '7M'], ['maj7#11'], 'major seventh sharp 11th');
ChordType.add(['1P', '3m', '5d', '7M'], ['dimmaj7'], 'diminished major seventh');
ChordType.add(['1P', '3m', '5P', '7M'], ['minmaj7'], 'minor minor seventh');
ChordType.add(['1P', '3M', '5d', '7m'], ['7b5'], 'dominant seventh flat 5');
ChordType.add(['1P', '3M', '5A', '7m'], ['7#5'], 'dominant seventh sharp 5');

const chords: Record<ChordType, Chord.Chord[]> = {
	major: [
		// Major
		Chord.get('maj7'),
		Chord.get('maj7#11'),
		Chord.get('maj7#5')
	],
	minor: [
		// Minor
		Chord.get('min7'),
		Chord.get('m7b5'),
		Chord.get('dim7'),
		Chord.get('dimmaj7'),
		Chord.get('minmaj7')
	],
	dominant: [
		// Dominant
		Chord.get('7'),
		Chord.get('7b5'),
		Chord.get('7#5'),
		Chord.get('7sus4')
	]
};
export default {
	...chords,
	types: ['major', 'minor', 'dominant'] satisfies ChordType[],
	get all() {
		return [...chords.major, ...chords.minor, ...chords.dominant];
	}
};
