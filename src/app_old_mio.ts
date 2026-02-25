// const message: string = 'Hola Mundox';
// console.log(message);
import fs from 'fs';
import { join } from 'path';


const CreateTable = (numTab: number, numMultiHasta: number, path:string) => {
    let txt: string = '';

    let header: string = '';
    header += `
=======================================
Tabla de ${numTab}
=======================================

`;

    for (let i: number = 1; i <= numMultiHasta; i++) {
        txt += `${numTab} x ${i} = ${numTab * i}\n`;
    }

    let fullContent: string = header + txt;
    console.log(fullContent);

    try {
        fs.writeFileSync(`${path}/tabla${numTab}.txt`, fullContent);
    }
    catch (e) {
        console.log(`Error: (${e})`);
    }
}


const ValidateDirectory = async (path: string) : Promise<boolean> => {
    try {
        // recursive: true hace que no falle si ya existe y crea subcarpetas si faltan
        await fs.mkdirSync(path, { recursive: true });
        console.log(`Directorio listo en: ${path}`);
        return true;
    } catch (error) {
        console.error('Error al gestionar el directorio:', error);
        return false;
    }
}


//TODO: AQUI ESTA EL FLUJO A SEGUIR

const Run = async () => {
    const numberTab:number = 5;
    const numMultiHasta: number = 10

    const path: string = join(process.cwd(), 'output');
    const existDirectory: boolean = await ValidateDirectory(path);
    
    if (existDirectory) {
        CreateTable(numberTab, numMultiHasta, path);
    }else{
        console.log('No se pudo crear tabla')
    }
};

Run();  //Ejecución




