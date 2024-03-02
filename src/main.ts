import { printReport } from "./report";
const {crawlPage} = require('./crawl');
printReport

export async function main(){
    if(process.argv.length < 3){
        console.log('no website there');
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log('too many arguments');
        process.exit(1);
    }

    const baseURL = process.argv[2];

    console.log(`crawling around ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});

    printReport(pages);
};

main();