
export default function AppLogoIcon({organization} ){
    return (
        <>
            {organization && <img src={`http://localhost:8000/storage/${organization.file.path}`} alt='Logo' />}
            {!organization && <img src="http://localhost:8000/logo-img.png" alt='Logo' />}
        </>
    );
}
