
export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}


export interface CreateTableOptions {
    base: number;
    limit?: number;
}


export class CreateTable implements CreateTableUseCase {
    constructor(
        /*
         * DI - Dependency Injection
        */
        // public val:any = 'HOLA',

    ) { };

    execute({ base, limit = 10 }: CreateTableOptions) {
        let outputMessage: string = '';
        console.log(limit);
        for (let i: number = 1; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${base * i}\n`;
        }

        return outputMessage;
    }

}



