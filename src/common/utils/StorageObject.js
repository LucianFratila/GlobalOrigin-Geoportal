export const SetObject = (key,object) => {
    localStorage.setItem(key, JSON.stringify(object));
}

export const GetObject  = (key) =>  {
    if(localStorage.getItem(key))
        return JSON.parse(localStorage.getItem(key));
    else
        return ''   
}
