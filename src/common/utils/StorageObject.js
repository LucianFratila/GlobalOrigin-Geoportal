export const SetObject = (key,object) => {
    localStorage.setItem(key, JSON.stringify(object));
}

export const GetObject  = (key) =>  {
    if(localStorage.getItem(key) && localStorage.getItem(key)!='undefined')
        return JSON.parse(localStorage.getItem(key));
    else
        return ''   
}
