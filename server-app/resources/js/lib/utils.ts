import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import imageCompression from 'browser-image-compression';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function handleImageUpload(event){
    const imageFiles = event.target.files;
    console.log(imageFiles);
    const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
    }
    try {
        const compressedImage = await imageCompression(imageFiles[0], options)
        return compressedImage;
    } catch (error) {
        console.log(error)

    }
}

