
export default function AppLogoIcon({props} ){
    return (
        <>
            {props?.organization && <img src={`http://localhost:8000/storage/${props.organization.file.path}`} alt='Logo' />}
            {!props?.organization && <img src="http://localhost:8000/storage/logo2.png" alt='Logo' />}
        </>
    );
}
