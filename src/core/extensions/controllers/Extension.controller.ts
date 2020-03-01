import { Request, Response } from 'express'

import RestController from '../../rest/controllers/Rest.controller'
import { IExtensionConfigurationFile, IExtensionModel } from '../interfaces/Extension.interfaces'
import ExtensionModel from '../models/Extension.model'
import { getConfigurationAsJSON, getValidExtensionsPaths } from '../utils/extension.util'

class ExtensionController extends RestController {
    protected model = ExtensionModel

    private validExtensionIds: string[] = []

    public synchronizeExtensions = async (req: Request, res: Response) => {
        try {
            await this.createOrUpdateExtensions()
            await this.removeOldExtensions()

            res.send({ message: 'Extensions have been synchronized' })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    private createOrUpdateExtensions = async () => {
        const validExtensionsPaths = getValidExtensionsPaths()

        for (const path of validExtensionsPaths) {
            const configuration = getConfigurationAsJSON(
                `${path}/extensionConfiguration.json`
            )

            const extension = await this.model.findOne({
                key: configuration.key
            })

            if (extension) {
                await this.updateExistingExtension(extension, configuration)
            } else {
                await this.createNewExtension(configuration)
            }
        }
    }

    private updateExistingExtension = async (
        extension: IExtensionModel,
        configuration: IExtensionConfigurationFile
    ) => {
        for (const key in configuration) {
            if (configuration.hasOwnProperty(key)) {
                const value = configuration[key]

                if (value) {
                    extension[key] = value
                }
            }
        }

        await extension.save()

        this.validExtensionIds.push(extension.toJSON().id.toString())
    }

    private createNewExtension = async (
        configuration: IExtensionConfigurationFile
    ) => {
        const newExtension = new this.model(configuration)

        await newExtension.save()

        this.validExtensionIds.push(newExtension.toJSON().id.toString())
    }

    private removeOldExtensions = async () => {
        const extensions = await this.model.find()

        for (const extension of extensions) {
            const extensionId = extension.toJSON().id.toString()

            if (!this.validExtensionIds.includes(extensionId)) {
                await this.model.deleteOne({ _id: extensionId })
            }
        }
    }
}

export default ExtensionController
