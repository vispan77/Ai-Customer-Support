import mongoose from "mongoose"

interface Settings {
    ownerId: string
    businessName: string
    supportEmail: string
    knowledge: string
}

const settingSchema = new mongoose.Schema<Settings>({
    ownerId: {
        type: String,
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        required: true
    },
    supportEmail: {
        type: String,
        required: true
    },
    knowledge: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const Setting = mongoose.models.Setting || mongoose.model<Settings>("Setting", settingSchema);

export default Setting;