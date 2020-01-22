import * as fs from 'fs'

export const getValidExtensions = (): string[] => {
	const validExtensions = []
	const extensionsRootFolderPath = './src/extensions/'
	const extensionFolders = fs.readdirSync(extensionsRootFolderPath)

	extensionFolders.forEach(extensionFolderName => {
		const extensionPath = extensionsRootFolderPath + extensionFolderName
		const isDirectory =
			fs.existsSync(extensionPath) &&
			fs.lstatSync(extensionPath).isDirectory()

		if (isDirectory) {
			const configurationFilePath = `${extensionPath}/extensionConfiguration.json`
			const hasConfigurationFile = fs.existsSync(configurationFilePath)

			if (hasConfigurationFile) {
				const configuration = getConfigurationAsJSON(
					configurationFilePath
				)

				if (isValidConfiguration(configuration)) {
					validExtensions.push(configuration.name)
				}
			}
		}
	})

	return validExtensions
}

export const getConfigurationAsJSON = (path: string) => {
	const rawData = fs.readFileSync(path).toString()
	return JSON.parse(rawData)
}

export interface IConfigurationFile {
	name: string
	version: string
}

export const isValidConfiguration = (
	configuration: IConfigurationFile
): boolean => {
	if (configuration.name) {
		return true
	}

	return false
}
