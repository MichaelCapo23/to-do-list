export function randomString(length = 8) {
    const characters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWWXxYyZz1234567890';
    let randomStr = '';
    for(let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomStr += characters[randomIndex];
    }
    return randomStr;
}