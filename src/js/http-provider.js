
const jokerUrl = 'https://api.chucknorris.io/jokes/random';
const urlUsuarios= 'https://reqres.in/api/users?page=2';

//Cloudinary
const cloudPreset = 'nlqtcap2';
const cloudUrl = 'https://api.cloudinary.com/v1_1/dyf90cblg/upload';

const obtenerChiste = async() => {

    try {
        const resp= await fetch( jokerUrl );

        if( !resp.ok ) throw 'Error123';
        const { id, value, icon_url }= await resp.json();

        return { id, value, icon_url };

    } catch (error) {
        
        throw error;
        
    }
}

const obtenerUsuarios = async() => {
    const resp = await fetch( urlUsuarios );
    const {data:usuarios} = await resp.json();
    
    return usuarios;
}

//Archivo Subir :: File
const subirImagen = async(archivoSubir) => {
    const formData = new FormData();
    formData.append('upload_preset', cloudPreset);
    formData.append('file', archivoSubir);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });

        if ( resp.ok ){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
        
    } catch (err) {
        throw err;
    }
}


export {
    obtenerChiste,
    obtenerUsuarios,
    subirImagen
}