const {JSDOM} = require('jsdom');

export async function crawlPage(baseURL: string, currentURL: string, pages: any): Promise<any>{
    // Pages is actually an object but i dont know what type to give it so it will be just any
    console.log(`currently crawling: ${currentURL}`);
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    };

    const normalCurrentURL = normalizeURL(currentURL);

    if(pages[normalCurrentURL] > 0){
        pages[normalCurrentURL]++;
        return pages
    };
    if(currentURL === baseURL){
        pages[normalCurrentURL] = 0
    }else{

    pages[normalCurrentURL] = 1; 
    }

    let htmlBody = ``;

    try {
        const response = await fetch(currentURL);

        if(response.status > 399){
            console.log(`error in fetch with status code: ${response.status}, on page: ${currentURL}`);
            return pages
        };

        const contentType = response.headers.get('content-type') as string;
    if(!contentType.includes('text/html')){
        console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`);
        return pages
    };
        const htmlBody = await response.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);
        for(const next of nextURLs){
            pages = await crawlPage(baseURL, next, pages);
        };
        
    } catch (error) {
        console.log(`error in fetch: ${error}, on page: ${currentURL}`);
        
    }
    return pages
};

export function normalizeURL(url: string){
    const urlObj: URL = new URL(url);
    let fullPath: string = `${urlObj.host}${urlObj.pathname}`;
    if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
        fullPath = fullPath.slice(0, -1)
    };
    return fullPath
}

// extracting links with the cheerio (chatgpt)
// function extractLinks(html: string, baseUrl: string): string[] {
//     const $ = cheerio.load(html);
//     let links: string[] = [];
//     $('a').each((index, element) => {
//         const href = $(element).attr('href');
//         if (href) {
//             const absoluteUrl = new URL(href, baseUrl).href;
//             links.push(absoluteUrl);
//         }
//     });
//     return links;
// }

export function getURLsFromHTML(htmlBody: any, baseURL: string): string[]{
    const urls: string[] = [];
    const dom = new JSDOM(htmlBody);
    const linkEls = dom.window.document.querySelectorAll('a');
    for (const el of linkEls){
        // console.log(el.href);
        if(el.href.slice(0, 1) === '/'){
            // relative url
            try {     
                const urlObj = new URL(`${baseURL}${el.href}`)
                urls.push(urlObj.href);
            } catch (error) {
                console.log(`error: ${error}`);
            }
        } else{
        // absolute url
        try {     
            const urlObj = new URL(el.href)
            urls.push(urlObj.href);
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }}
    return urls;
}