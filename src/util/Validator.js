export const validateUserName = (username) => {
    const errs = {}

    if (!username)
        errs.username = 'Required';

    return errs;
}

export const validateEmail = (email) => {
    const errs = {}

    if (!email)
        errs.email = 'Required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
        errs.email = 'Invalid Email Address';

    return errs;
}

export const validateLoginPassword = (password) => {
    const errs = {}

    if (!password)
        errs.password = 'Required';
    return errs;
}

export const validateRegistrationPassword = (password, confirm_password) => {
    const errs = {}

    if (!password)
        errs.password = 'Required';
    else if (password.length < 5)
        errs.password = 'Password must be at least 5 characters long';
    if (!confirm_password)
        errs.confirm_password = 'Required';
    else if (password != confirm_password)
        errs.confirm_password = 'Passwords do not match'

    return errs;
}

//(array of different fields to check (strings))
export const validateIsFilled = (fields, values) => {
    const errs = {}

    fields.forEach((field) => {
        if (values[field] === '')
            errs[field] = 'Field is Required'
    })
    
    return errs
}

export const validateMaxLength = (field, values, num_chars) => {
    const errs = {}

    if (values[field].length > num_chars)
        errs[field] = 'Entry too long, must be less than ' + num_chars + ' characters.'
    return errs
}

// export const validateUserName = (username) => {
//     const errors
//     if (!username)
//         return 'Required';
// }
