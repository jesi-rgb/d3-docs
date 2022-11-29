export function toWindows(inputArray, size) {
	return inputArray.reduce((acc, _, index, arr) => {
		if (index + size > arr.length) {
			//we've reached the maximum number of windows, so don't add any more
			return acc;
		}

		//add a new window of [currentItem, maxWindowSizeItem)
		return acc.concat(
			//wrap in extra array, otherwise .concat flattens it
			[arr.slice(index, index + size)]
		);
	}, []);
}

export function arrayPairs(array) {
	return toWindows(array, 2);
}
