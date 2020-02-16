export interface IFolder {
	exists: boolean
	path: string
}

export interface IMedia {
	name: string
	directory: boolean
	items?: number
	extension?: string
	baseName?: string
}