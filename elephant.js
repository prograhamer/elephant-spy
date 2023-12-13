const getURL = (asset) => {
	if (typeof chrome !== 'undefined') {
		return chrome.runtime.getURL(asset);
	}

	return browser.runtime.getURL(asset);
}

const getAudioElement = (asset) => {
	const url = getURL(`assets/${asset}.mp3`);
	const audio = document.createElement("audio");
	const source = document.createElement("source");
	audio.className = `elephant-spy ${asset}`;
	source.src = url;
	source.type = "audio/mpeg";
	audio.appendChild(source);
	document.body.append(audio);
	return audio;
}

const alerts = [
	{
		re: /resistance/i,
		audio: getAudioElement('elephant'),
	},
	{
		re: /determination/i,
		audio: getAudioElement('eagle'),
	},
	{
		re: /assertion/i,
		audio: getAudioElement('rhino'),
	},
];

let logger = (records, observer) => {
	for (const record of records) {
		for (const added of record.addedNodes) {
			if (added.classList && added.classList.contains("ark-card") && added.classList.contains("animal-card")) {
				for (alert of alerts) {
					if (alert.re.test(added.innerText)) {
						alert.audio.play().then(() => {
							console.log("played audio for alert", alert);
						}).catch((e) => {
							console.log("failed to play audio", e);
						});
					}
				}
			}
		}
	}
};

const observerOptions = {
	childList: true,
	subtree: true,
};

const observer = new MutationObserver(logger);
observer.observe(document.querySelector("body"), observerOptions);
