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

const limits = {
	fileSize: 2 * 1024 * 1024
}

const fileFilter = (req, file, cb) => {
	const fileExtension = file.originalname.split('.').pop()

	if(fileExtension in allowedFileTypes){
		if(allowedFileTypes[fileExtension] === file.mimetype){
			cb(null, true)
		} else {
			cb(new Error('Mimetype and file extensions does not match'))
		}
	} else {
		cb(new Error('The file type is not allowed'))
	}
}

export const upload = multer({ storage, limits, fileFilter })

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

export const allowedFileTypes = {
	csv: 'text/csv',
	doc: 'application/msword',
	docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	gif: 'image/gif',
	jpeg: 'image/jpeg',
	jpg: 'image/jpeg',
	mp3: 'audio/mpeg',
	mpeg: 'video/mpeg',
	png: 'image/png',
	pdf: 'application/pdf',
	ppt: 'application/vnd.ms-powerpoint',
	pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	svg: 'image/svg+xml',
	txt: 'text/plain',
	webm: 'video/webm',
	webp: 'image/webp',
	xls: 'application/vnd.ms-excel',
	xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}