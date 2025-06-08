const appUrl = import.meta.env.VITE_APP_URL;
export default function AppLogoIcon({organization} ){
    return (
        <>
            {organization && <img src={`${appUrl}/storage/${organization.file.path}`} alt='Logo' />}
            {!organization && <img src={`${appUrl}/logo-img.png`} alt='Logo' />}
        </>
    );
}
