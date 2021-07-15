export function listToString(list){
    let res =""
    for (var key in list) {
        if (list.hasOwnProperty(key)) {
            if(list[key]){
                if(key==='careerDevelopment'){
                    res= res +"careers" +" "
                }else if(key==='gradSchool'){
                    res = res + "Graduate Studies"+" "
                }
                else{
                    res = res + key +" "

                }
            }
        }
    }
    return res

}