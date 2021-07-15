export function listToString(list){
    for (var key in list) {
        if (list.hasOwnProperty(key)) {
            console.log(key);
        }
    }
}