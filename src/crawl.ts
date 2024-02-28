export function normalizeURL(url: string){
    const urlObj: URL = new URL(url);
    let fullPath: string = `${urlObj.host}${urlObj.pathname}`;
    if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
        fullPath = fullPath.slice(0, -1)
    };
    return fullPath
}