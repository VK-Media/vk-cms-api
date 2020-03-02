import { Document } from "mongoose"

export interface IContentModel extends Document {
    name: string
}
