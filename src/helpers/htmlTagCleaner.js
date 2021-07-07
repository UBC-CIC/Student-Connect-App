export function htmlTagCleaner(text){
    let res = text.replace(/<[^>]*>/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim()
    return res
}

export function bracketRemover(text){
    let res=text.replace(/\[/," ").replace(/\.*?\]/," ")
    return res

}