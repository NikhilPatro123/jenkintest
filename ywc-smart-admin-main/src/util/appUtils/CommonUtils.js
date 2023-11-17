export const  isStringNullorEmpty = (str) => {
    if (str === undefined || str === '' || str === null) {
        return true;
    } else {
        return false;
    }
};


export const isArrayNotEmpty = (list) => {
    return (Array.isArray(list) && list.length);
};