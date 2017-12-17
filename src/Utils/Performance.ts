import { IStringMap } from './Types';

interface ICallStats {
	count: number;
	min: number;
	max: number;
	ave: number;
}

let frameStats: IStringMap<ICallStats> = {};
let frameTimers: IStringMap<number[]> = {};
let logFrameStats: boolean = false;

export function enableFrameStatLogs(): void {
	logFrameStats = true;
}

export function frameStart(): void {
	//
}

export function startBlock(key: string): number {
	if (!frameStats[key]) {
		frameStats[key] = {
			ave: 0,
			count: 0,
			min: Number.MAX_SAFE_INTEGER,
			max: Number.MIN_SAFE_INTEGER,
		};
	}
	if (!frameTimers[key]) {
		frameTimers[key] = [];
	}

	return frameTimers[key].push(performance.now()) - 1;
}

export function endBlock(key: string, index: number): void {
	const stats = frameStats[key];
	if (!stats) {
		console.error(`Missing stats for ${key}`);
	}
	const timers = frameTimers[key];
	if (!timers) {
		console.error(`Missing timers for ${key}`);
	}

	const startTime = timers[index];
	const endTime = performance.now();
	const duration = endTime - startTime;

	stats.ave = ((stats.ave * stats.count) + duration) / (stats.count + 1);
	stats.count++;
	if (duration > stats.max) stats.max = duration;
	if (duration < stats.min) stats.min = duration;
}

export function frameEnd(): void {
	if (logFrameStats) console.log(frameStats);
	frameStats = {};
	frameTimers = {};
}

const privatePropertyTracker = (target: any, key: string): void => {
	const objectName = (target ? target.constructor.name + '::' : '') + key;
	console.log(`Tracking property ${objectName}`);

	let value;
	const tracker = function() {
		if (!value) return;
		const index = startBlock(objectName);
		const result = value.apply(this, arguments);
		endBlock(objectName, index);
		return result;
	};

	const getter = () => {
		return tracker;
	};

	const setter = (newValue) => {
		value = newValue;
	};

	Object.defineProperty(target, key, {
		get: getter,
		set: setter,
		enumerable: true,
		configurable: true,
	});
};

const privateMethodTracker = (target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
	const objectName = (target ? target.constructor.name + '::' : '') + key;
	console.log(`Tracking method ${objectName}`);

	if (descriptor === undefined) {
		descriptor = Object.getOwnPropertyDescriptor(target, key);
	}
	const originalMethod = descriptor.value;

	// tslint:disable-next-line:only-arrow-functions
	descriptor.value = function() {
		const index = startBlock(objectName);
		const result = originalMethod.apply(this, arguments);
		endBlock(objectName, index);
		return result;
	};
	return descriptor;
};

export function methodTracker() {
	return privateMethodTracker;
}

export function propertyTracker() {
	return privatePropertyTracker;
}
