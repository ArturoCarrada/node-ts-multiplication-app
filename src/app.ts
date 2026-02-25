import { yarg } from "./plugins/args.plugin"
import { ServerApp } from "./presentation/server-app";

(async() => {
    await main();
})();

// console.log(process.argv)

async function main(){   
    console.log(yarg);

    const {b:base, l:limit, s:showTable, n:fileName, d:fileDestination} = yarg;

    ServerApp.run({base, limit, showTable, fileName, fileDestination});

}



