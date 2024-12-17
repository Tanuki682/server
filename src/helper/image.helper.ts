import { fileTypeFromBuffer } from 'file-type'

const acceptImageType = ['image/jpeg', 'image/png']

export const Imagehelper = {
    isImage: async function (fileArrayBuffer: ArrayBuffer): Promise<boolean> {
        // const buffer = await file.arrayBuffer()
        const fileTypeResult = await fileTypeFromBuffer(fileArrayBuffer)
        if (fileTypeResult === undefined)
            return false
        return acceptImageType.includes(fileTypeResult.mime)
    }
}