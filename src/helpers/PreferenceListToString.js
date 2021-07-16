export function listToString(list){
    let res =""
    for (var key in list) {
        if (list.hasOwnProperty(key)) {
            if(list[key]){
                if(key==='careerDevelopment'){
                    res= res +"careers" +" "
                }else if(key==='gradSchool'){
                    res = res + "Graduate Studies "
                }else if (key==='recreation'){
                    res = res + 'recreation ' + 'UBCO life '
                }
                else{
                    res = res + key +" "

                }
            }
        }
    }
    return res

}