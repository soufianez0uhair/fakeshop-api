const validatorEmail = (email) => {
    if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        return false;
    }

    return true;
}

const validatorPassword = (password) => {
    const alphabets = 'abcdefghijklmnopqrstuvwcxyz';
    const numbers = '0123456789';

    let isAlpha = false;
    let isUpperAlpha = false;
    let isNum = false;
    let isSpecialChar = false;

    let i = 0;
    while(i < password.length && (!isAlpha || !isNum || !isUpperAlpha || !isSpecialChar)) {
        if(alphabets.indexOf(password[i]) !== -1) {
            isAlpha = true;
        } else if(numbers.indexOf(password[i]) !== -1) {
            isNum = true;
        } else if(alphabets.toUpperCase().indexOf(password[i]) !== -1) {
            isUpperAlpha = true;
        } else {
            isSpecialChar = true;
        }
        i++;
    }

    if(!isAlpha || !isNum || !isUpperAlpha || !isSpecialChar) {
        return false;
    }

    return true;
}

const validatorName = (name) => {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';

    let i = 0;

    while(i < name.length && alphabets.indexOf(name[i]) !== -1) {
        i++;
    }

    if(i < name.length) {
        return false;
    }

    return true;
}

const validatorNumber = (number) => {
    const numbers = '0123456789';

    let i = 0;

    while(i < number.length && numbers.indexOf(number[i]) !== -1) {
        i++;
    }

    if(i < number.length) {
        return false;
    }

    return true;
}

module.exports = {validatorEmail, validatorPassword, validatorName, validatorNumber}