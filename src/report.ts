export function printReport(pages: {}){
    console.log('========');
    console.log('REPORT');
    console.log('========');
    const sortedPages: [string, number][] = sortPages(pages);
    for(const sortedPage of sortedPages){
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`Found ${hits} links to page: ${url}`);
        
    };
    console.log('========');
    console.log('END OF REPORT');
    console.log('========');
}

export function sortPages(pages: {}){
    // return [];
    const pagesArr: [string, number][] = Object.entries(pages);
    pagesArr.sort((a: [string, number], b: [string, number]) => {
        let aHits= a[1];
        let bHits = b[1];
        return b[1] - a[1];
    });
    return pagesArr;
}