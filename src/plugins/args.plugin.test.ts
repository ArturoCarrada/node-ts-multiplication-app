// import { yarg } from "./args.plugin";

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('./args.plugin');
    return yarg;
}

const originalArgv = process.argv;

beforeEach(() => {
    jest.resetModules(); // Limpia el cache de los imports
    process.argv = originalArgv; // Limpia los argumentos para que no se acumulen
});

describe('Args Plugin', () => {
    test('should return default values', async () => {
        const argv = await runCommand(['-b', '5']);
        // console.log(yarg)
        // console.log(process.argv);
        console.log(argv);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));
    });


    test('should return configuration with custom values', async () => {
        const argv = await runCommand(['-b', '8', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir']);

        console.log(argv);

        expect(argv).toEqual(expect.objectContaining({
            b: 8,
            l: 20,
            s: true,
            n: 'custom-name',
            d: 'custom-dir',
        }));

    });

});

