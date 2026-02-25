// const message: string = 'Hola Mundox';
// console.log(message);
import fs from 'fs';
import { join } from 'path';
import { yarg } from './plugins/args.plugin';


const CreateTable = (base: number, limit: number, path:string, show:boolean) => {
    
    let header: string = '';
    header += `
    =======================================
    Tabla de ${base}
    =======================================
    
    `;
    
    let outputMessage: string = '';
    for (let i: number = 1; i <= limit; i++) {
        outputMessage += `${base} x ${i} = ${base * i}\n`;
    }

    let fullContent: string = header + outputMessage;
    
    if (show) console.log(fullContent); //Muestra tabla de acuerdo a 'show-s'

    try {
        fs.writeFileSync(`${path}/tabla${base}.txt`, fullContent);
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

    console.log(yarg)

    const {b, l, s} = yarg;

    const base:number = b;
    const limit: number = l;
    const show: boolean = s;

    const path: string = join(process.cwd(), 'output');
    const existDirectory: boolean = await ValidateDirectory(path);
    
    if (existDirectory) {
        CreateTable(base, limit, path, show);
    }else{
        console.log('No se pudo crear tabla')
    }
};

Run();  //Ejecución




