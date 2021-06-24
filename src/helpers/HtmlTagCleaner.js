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
export function eventDateCleaner(date){
    return date.substr(0, 16)

}
export function eventEndDateCleaner(startDate, endDate){
    let firstDateString = new Date(startDate).toLocaleDateString('en-CA')
    let secondDateString  = new Date(endDate).toLocaleDateString('en-CA')
    if (firstDateString === secondDateString){
        endDate=endDate.substr(10,6)
    }
    return endDate
}