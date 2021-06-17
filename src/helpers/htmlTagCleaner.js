export function htmlTagCleaner(text){
    let res = text.replace(/<[^>]*>/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim()
    return res
}