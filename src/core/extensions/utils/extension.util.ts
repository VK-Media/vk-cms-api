import * as fs from 'fs'

import { IExtensionConfigurationFile } from '../interfaces/Extension.interfaces'

export const getValidExtensionsPaths = (): string[] => {
    const validExtensions = []

    getExtensionsPaths().forEach(extensionPath => {
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
                    validExtensions.push(extensionPath)
                }
            }
        }
    })

    return validExtensions
}

export const getExtensionsRootFolderPath = (): string => {
    return './src/extensions/'
}

export const getExtensionsPaths = (): string[] => {
    const extensionsRootFolderPath = getExtensionsRootFolderPath()
    const extensionFolders = fs.readdirSync(extensionsRootFolderPath)

    return extensionFolders.map(extensionFolder => {
        return extensionsRootFolderPath + extensionFolder
    })
}

export const getConfigurationAsJSON = (path: string) => {
    const rawData = fs.readFileSync(path).toString()
    return JSON.parse(rawData)
}

export const isValidConfiguration = (
    configuration: IExtensionConfigurationFile
): boolean => {
    const requiredKeys = ['name', 'key', 'version']

    requiredKeys.forEach(key => {
        if (!configuration[key]) {
            return false
        }
    })

    return true
}

export const getExtensionRouteFiles = (
    extensionFolderName: string
): string[] => {
    const routeFiles = []
    const routesFolder = `${extensionFolderName}/routes/`
    const isDirectory =
        fs.existsSync(routesFolder) && fs.lstatSync(routesFolder).isDirectory()

    if (isDirectory) {
        fs.readdirSync(routesFolder).forEach(routeFileName => {
            if (routeFileName.includes('.routes.ts')) {
                routeFiles.push(routesFolder + routeFileName)
            }
        })
    }

    return routeFiles
}
