const {JSDOM} = require('jsdom');

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