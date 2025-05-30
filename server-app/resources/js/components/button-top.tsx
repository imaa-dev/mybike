import { router } from '@inertiajs/react';

const ButtonTop =  () => {
    return (
        <div className="inline-flex rounded-md shadow-xs">
            <button
                type="button"
                onClick={() => router.visit(route('organization.list'))}
                className="me-2 mb-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
            >
                Listar
            </button>
            <button
                type="button"
                onClick={() => router.visit(route('organization.create'))}
                className="me-2 mb-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-4 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
            >
                Crear
            </button>
        </div>
    )
}
export default ButtonTop;
