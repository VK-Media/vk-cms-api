import * as bodyParser from 'body-parser'
import * as express from 'express'
import { connect } from 'mongoose'
import AuthenticationRoutes from './core/authentication/routes/Authentication.routes'
import UserRoutes from './core/authentication/routes/User.routes'
import UserGroupRoutes from './core/authentication/routes/UserGroup.routes'
import CollectionRoutes from './core/collections/routes/Collection.routes'
import CollectionItemRoutes from './core/collections/routes/CollectionItem.routes'
import { loadCoreConfigurations } from './core/configuration/utils/configuration.utils'
import ExtensionLoaderController from './core/extensions/controllers/ExtensionLoader.controller'
import ExtensionRoutes from './core/extensions/routes/Extension.routes'
import ModuleRoutes from './core/modules/routes/Module.routes'

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

		// this.extensionLoaderController.loadRoutesFromValidExtensions(this.app)
		loadCoreConfigurations().then(() => {
			console.log('Core configurations are loaded')
		}).catch(error => {
			console.log(error)
		})
	}

	private mongoSetup(): void {
		connect(this.mongoUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}).then(() => {
			console.log('Connected to database!')
		}).catch(error => {
			console.log(error)
		})
	}

	private initializeRoutes(): void {
		const routesToLoad = {
			'auth': AuthenticationRoutes,
			'users': UserRoutes,
			'userGroups': UserGroupRoutes,
			'collections': CollectionRoutes,
			'collectionItems': CollectionItemRoutes,
			'extensions': ExtensionRoutes,
			'modules': ModuleRoutes
		}

		for (const route in routesToLoad) {
			if (routesToLoad.hasOwnProperty(route)) {
				const routes = new routesToLoad[route](route)
				routes.routes(this.app)
			}
		}
	}
}

export default new App().app
