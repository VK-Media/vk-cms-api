import { Request, Response } from 'express'
import * as fs from 'fs'
import * as multer from 'multer'
import { IFolder } from '../interfaces/Media.interfaces'
import { getFolderFromRequest, getMediaFromPath, upload } from '../utils/media.utils'

class MediaController {
	public getMediaInPath = (req: Request, res: Response) => {
		try {
			res.send(getMediaFromPath(req.query.path))
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public uploadFile = (req: Request, res: Response) => {
		upload.single('file')(req, res, error => {
			if (error instanceof multer.MulterError) {
				return res.status(400).send(error)
			} else if (error) {
				if (error.code === 'ENOENT') {
					return res.status(404).send({ error: 'The destination does not exist' })
				}

				return res.status(400).send({ error: 'Something went wrong' })
			}

			res.send({ message: 'The file has been uploaded!' })
		})
	}

	public createFolder = (req: Request, res: Response) => {
		const folder = getFolderFromRequest(req)

		if (req.body.name) {
			try {
				if (!folder.exists) {
					fs.mkdirSync(folder.path, { recursive: true })

					res.send({ message: 'The folder has been created' })
				} else {
					res.status(409).send({ error: 'A folder with this name already exists at the destination' })
				}
			} catch (error) {
				res.status(400).send({ error: error.message })
			}
		} else {
			res.status(400).send({ error: 'No folder name provided' })
		}
	}

	public deleteFolder = (req: Request, res: Response) => {
		const folder: IFolder = getFolderFromRequest(req)

		if (folder.exists) {
			fs.rmdirSync(folder.path, { recursive: true })

			res.send({ message: 'The folder has been deleted' })
		} else {
			res.status(400).send({ error: 'There is no such folder at the destination' })
		}
	}
}

export default MediaController