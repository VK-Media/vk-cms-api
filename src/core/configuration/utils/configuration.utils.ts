import * as fs from 'fs'
import { IConfiguration } from '../interfaces/Configuration.interfaces'

export const loadCoreConfigurations = async () => {
	const coreFolders = getCoreConfigurationPaths()

	for (const folder of coreFolders) {
		const { default: configurationModuleClass } = await import(folder)
		const configurationModule: IConfiguration = new configurationModuleClass()

		if(typeof configurationModule.addModules === 'function'){
			configurationModule.addModules()
		}
	}
}

const getCoreRootFolderPath = (): string => {
	return './src/core/'
}

const getCoreConfigurationPaths = (): string[] => {
	const coreRootFolderPath = getCoreRootFolderPath()
	const folders = fs.readdirSync(coreRootFolderPath)
	const coreConfigurationPaths = []

	for (const folder of folders) {
		const corePath = coreRootFolderPath + folder
		const isDirectory = fs.existsSync(corePath) && fs.lstatSync(corePath).isDirectory()

		if (isDirectory) {
			const configurationFilePath = `${corePath}/configuration.ts`
			const hasConfigurationFile = fs.existsSync(configurationFilePath)

			if (hasConfigurationFile) {
				coreConfigurationPaths.push(`${corePath}/configuration`.replace('./src/', '../../../'))
			}
		}
	}

	return coreConfigurationPaths
}