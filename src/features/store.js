
export function moveToLocalStore(data){
    const keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++){
        localStorage.setItem(keys[i], data[keys[i]])
    }
}