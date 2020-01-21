import { Request, Response } from 'express'
import { Document, Model } from 'mongoose'

abstract class ControllerAbstract {
	protected abstract model: Model<Document>
	public abstract create(req: Request, res: Response): void
	public abstract getAll(req: Request, res: Response): void
	public abstract getById(req: Request, res: Response): void
	public abstract update(req: Request, res: Response): void
	public abstract delete(req: Request, res: Response): void
}

export default ControllerAbstract
