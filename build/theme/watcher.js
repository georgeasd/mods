const readline = require('readline');
const Watchpack = require("watchpack");


function objectToMap(obj) {
	return new Map(
		Object.keys(obj).map(key => {
			/** @type {[string, string]} */
			const pair = [key, obj[key]];
			return pair;
		})
	);
};

const options = {
	aggregateTimeout: 0,
	poll: true,
	ignored: /node_modules/
};

let watcher = null;

function watch(line) {
	console.log('__WATCHING__::',line);	
	const oldWatcher = watcher;
	watcher = new Watchpack(options);

	watcher.on("aggregated", (changes, removals) => {
		changes = changes.concat(removals);
		console.log('__CHNAGED__');	
	});

	let listOfDirectories = line.split('|');

	watcher.watch([], listOfDirectories, Date.now() - 10000);

	if (oldWatcher) {
		oldWatcher.close();
	}
}

const rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', (line) => {
    watch(line);
}).on('close',() => {
	console.log('close');
	if(watcher) {
		watcher.close();
	}	
    process.exit(0);
});