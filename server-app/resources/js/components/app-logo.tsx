import AppLogoIcon from './app-logo-icon';
import { Link } from '@inertiajs/react';

export default function AppLogo({ props }) {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon props={props} className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                {props?.organization && <span className="mb-0.5 truncate leading-none font-semibold">{props.organization.name}</span>}
                {!props?.organization && (
                    <Link href="/create/organization" className="text-sm text-blue-500 hover:underline">
                        Agregar Organización
                    </Link>
                )}
            </div>
        </>
    );
}
