import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import imageCompression from 'browser-image-compression';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const handleImageUpload = async (file: File) => {
    const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 500,
        useWebWorker: true,
        initialQuality: 0.7,
        alwaysKeepResolution: false,
        maxIteration: 10,
    }
    try {
        const compressedImage = await imageCompression(file, options)
        return compressedImage
    } catch (error) {
        console.log(error)
        return error;
    }
}
export default handleImageUpload;

