const appUrl = import.meta.env.VITE_APP_URL;
export default function AppLogoIcon({organization} ){
    console.log(organization, 'APPLOGOICON')
    return (
        <>
            {organization && organization.file.path && <img src={`${appUrl}/storage/${organization.file.path}`} alt='Logo' />}
            {!organization && <img src={`${appUrl}/logo-img.png`} alt='Logo' />}
        </>
    );
}
