const queue = {}

export const add = (name: string, fn: CallableFunction) => {
	if (!queue[name]) {
		queue[name] = []
	}

	queue[name].push(fn)
}

export const call = (name: string, ...params: any) => {
	if (queue[name]) {
		for(const fn of queue[name]){
			fn(...params)
		}

		delete queue[name]
	}
}