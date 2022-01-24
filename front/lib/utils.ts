

export const cookieParser = (cookieString: string | undefined) => {
    const cookies: { [key: string]: string } = {};

    if(cookieString) {
        const itemString = cookieString?.split(/\s*;\s*/);
        itemString.forEach((pairs) => {
            const pair = pairs.split(/\s*=\s*/);
            cookies[pair[0]] = pair.splice(1).join("=");
        });
    }

    return cookies;
}

export const getNumber = (string: string) => {
    const numbers = string.match(/\d/g)?.join("");
    if(numbers) {
        return Number(numbers);
    }
    return null;
};

export const makeMoneyString =  (price: string) => {
    const checkedPrice = price.replace(/[^0-9]/g, "");
    return Number(checkedPrice).toLocaleString("en-US");    
}