import '../css/app.css';
import 'flowbite'
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { LoadingProvider } from '@/context/LoadingContext';
import LoadingModal from '@/components/LoadingModal';
import { ConfirmDialogProvider } from '@/context/ModalContext';
import { ToastProvider } from '@/context/ToastContext';
import { ModalFormProvider } from '@/context/ModalContextForm';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ToastProvider>
                <ConfirmDialogProvider>
                    <LoadingProvider>
                        <ModalFormProvider>
                            <LoadingModal />
                            <App {...props} />
                        </ModalFormProvider>
                    </LoadingProvider>
                </ConfirmDialogProvider>
            </ToastProvider>

        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
