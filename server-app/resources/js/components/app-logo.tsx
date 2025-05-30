import AppLogoIcon from './app-logo-icon';

export default function AppLogo({ props }) {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon props={props}  />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                {props?.organization ? <span className="mb-0.5 truncate leading-none font-semibold">{props.organization.name}</span>
                    :
                    <span className="mb-0.5 truncate leading-none font-semibold">Crear Organizacion</span>
                }
            </div>
        </>
    );
}
