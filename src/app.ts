import * as bodyParser from 'body-parser'
import * as express from 'express'
import { connect } from 'mongoose'

import CollectionRoutes from './core/collections/routes/Collection.routes'
import ExtensionLoaderController from './core/extensions/controllers/ExtensionLoader.controller'
import ExtensionRoutes from './core/extensions/routes/Extension.routes'
import UserRoutes from './core/users/routes/User.routes'

class App {
	public app: express.Application
	private mongoUrl: string = process.env.MONGODB_URL
	private extensionLoaderController = new ExtensionLoaderController()

	constructor() {
		this.app = express()
		this.config()
		this.mongoSetup()
		this.initializeRoutes()
	}

	private config(): void {
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: false }))
		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*')
			res.header(
				'Access-Control-Allow-Headers',
				'Origin, X-Requested-With, Content-Type, Accept, Authorization'
			)
			res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
			next()
		})

		this.extensionLoaderController.loadRoutesFromValidExtensions(this.app)
	}

	private mongoSetup(): void {
		connect(this.mongoUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
	}

	private initializeRoutes(): void {
		const userRoutes: UserRoutes = new UserRoutes('users')
		const collectionRoutes: CollectionRoutes = new CollectionRoutes(
			'collections'
		)
		const extensionRoutes: ExtensionRoutes = new ExtensionRoutes(
			'extensions'
		)

		userRoutes.routes(this.app)
		collectionRoutes.routes(this.app)
		extensionRoutes.routes(this.app)
	}
}

export default new App().app
