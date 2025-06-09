import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import imageCompression from 'browser-image-compression';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const handleImageUpload = async (file: File) => {
    // Función auxiliar para determinar el tipo MIME correcto
    const getProperMimeType = (fileName: string): string => {
        const ext = fileName.split('.').pop()?.toLowerCase() || '';
        const mimeTypes: Record<string, string> = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'heic': 'image/heic'
        };
        return mimeTypes[ext] || 'image/jpeg';
    };

    try {
        const buffer = await file.arrayBuffer();

        const properMimeType = getProperMimeType(file.name);

        const properFile = new File([buffer], file.name, {
            type: properMimeType
        });

        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            initialQuality: 0.8,
            fileType: properMimeType,
            alwaysKeepResolution: false,
            preserveExif: false,
            maxIteration: 10
        };

        let compressedImage = await imageCompression(properFile, options);

        if (compressedImage.size > 2 * 1024 * 1024) {
            const secondOptions = {
                ...options,
                maxSizeMB: 1,
                maxWidthOrHeight: 1280,
                initialQuality: 0.7
            };
            compressedImage = await imageCompression(compressedImage, secondOptions);
        }

        const timestamp = Date.now();
        const safeFileName = file.name
            .toLowerCase()
            .replace(/[^a-z0-9.]/g, '_')
            .replace(/_{2,}/g, '_');
        const finalFileName = `${safeFileName.split('.')[0]}_${timestamp}.${properMimeType.split('/')[1]}`;

        const finalFile = new File([compressedImage], finalFileName, {
            type: properMimeType,
            lastModified: Date.now()
        });

        if (finalFile.size === 0) {
            throw new Error('El archivo procesado está vacío');
        }

        return finalFile;
    } catch (error) {
        console.error('Error procesando imagen:', error);
        throw new Error('Error al procesar la imagen. Por favor, intenta con otra imagen o reduce su tamaño.');
    }
};

export default handleImageUpload;

