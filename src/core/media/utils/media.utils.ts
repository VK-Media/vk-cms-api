import { Request } from 'express'
import * as fs from 'fs'
import * as multer from 'multer'
import slugify from 'slugify'
import { IFolder } from '../interfaces/Media.interfaces'

const storage = multer.diskStorage({
	destination(req, file, cb) {
		const folder = getFolderFromRequest(req)

		cb(null, folder.path)
	},
	filename(req, file, cb) {
		const folder = getFolderFromRequest(req)

		cb(null, getUniqueFilename(folder.path, getSafeFilename(file.originalname)))
	}
})

export const getUniqueFilename = (destination: string, filename: string): string => {
	let uniqueFilename = filename
	let counter = 0

	while (fs.existsSync(`${destination}/${uniqueFilename}`)) {
		const filenameParts = filename.split('.')
		const baseName = filenameParts[0]
		const extension = filenameParts.pop()

		uniqueFilename = `${baseName}-${++counter}.${extension}`
	}

	return uniqueFilename
}

export const getSafeFilename = (originalFilename: string): string => {
	return slugify(originalFilename, { remove: /"<>#%{}\|\\\^~\[]`;\?:@=&/g }).toLowerCase()
}

export const upload = multer({ storage })

export const getFolderFromRequest = (req: Request): IFolder => {
	const path = ['./media']

	if (req.body.destination) {
		path.push(req.body.destination)
	}

	if (req.body.name) {
		path.push(req.body.name)
	}

	const fullPath = path.join('/')

	return {
		path: fullPath,
		exists: fs.existsSync(fullPath)
	}
}