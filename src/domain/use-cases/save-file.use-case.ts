
import fs from 'fs';
import { join } from 'path';


export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination: string;
    fileName: string;
}


export class SaveFile implements SaveFileUseCase {
    constructor(
        /*
        * repository: StorageRepository
        */
    ) { }


    execute({
        fileContent,
        fileDestination,// = 'outputs',
        fileName,// = 'table',
    }: Options): boolean {

        try{
            const outputPath: string = join(process.cwd(), fileDestination);
            fs.mkdirSync(outputPath, { recursive: true });
            fs.writeFileSync(`${outputPath}/${fileName}.txt`, fileContent);

            return true;
        }
        catch (e){
            console.log(e);
            return false;
        }
    }
}








