// import { describe, test, expect } from '@jest/globals';
import { SaveFile, Options } from './save-file.use-case';
import fs from 'fs';


describe('SaveFileUseCase', () => {
    afterEach(() => {
        // Limpia la carpeta outputs antes de cada prueba
        const outputDir = 'outputs';
        fs.rmSync(outputDir, { recursive: true, force: true });

        const outputDirCustom = 'custom-outputs/file-destination';
        fs.rmSync(outputDirCustom, { recursive: true, force: true });
    });
    
    const defaultOptions: Options = {
        fileContent: 'test content',
        fileDestination: 'outputs',
        fileName: 'test'
    };

    const customOptions: Options = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    };


    test('Should save a file with default values', () => {
        const saveFile = new SaveFile();

        const filePath = `${defaultOptions.fileDestination}/${defaultOptions.fileName}.txt`;

        const result = saveFile.execute(defaultOptions);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe(defaultOptions.fileContent);
    });
   
   
    test('Should save a file with custom values', () => {
        const saveFile = new SaveFile();

        const filePath = customOptions.fileDestination + '/' + customOptions.fileName + '.txt';

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe(customOptions.fileContent);
    });


    test('Should handle errors gracefully', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('Mocked mkdir error'); });

        const result = saveFile.execute(customOptions);

        expect(result).toBeFalsy();
        // expect(mkdirSpy).toHaveBeenCalled();

    });

});


