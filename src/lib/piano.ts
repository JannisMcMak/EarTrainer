import * as Tone from 'tone';

const piano = new Tone.Sampler({
	urls: {
		A3: '45.mp3',
		'A#3': '46.mp3',
		B3: '47.mp3',
		C4: '48.mp3',
		'C#4': '49.mp3',
		D4: '50.mp3',
		'D#4': '51.mp3',
		E4: '52.mp3',
		F4: '53.mp3',
		'F#4': '54.mp3',
		G4: '55.mp3',
		'G#4': '56.mp3',
		A4: '57.mp3',
		'A#4': '58.mp3',
		B4: '59.mp3',
		C5: '60.mp3',
		'C#5': '61.mp3',
		D5: '62.mp3',
		'D#5': '63.mp3',
		E5: '64.mp3',
		F5: '65.mp3',
		'F#5': '66.mp3',
		G5: '67.mp3',
		'G#5': '68.mp3',
		A5: '69.mp3',
		'A#5': '70.mp3',
		B5: '71.mp3'
	},
	release: 1,
	baseUrl: '/sounds/note_',
	onload: () => {
		console.log('sampler loaded');
	},
	onerror: (e) => {
		console.error('Sampler error', e);
	}
}).toDestination();

export default piano;
