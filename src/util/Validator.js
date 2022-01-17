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
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
        errs.email = 'Invalid Email Address';

    return errs;
}

export const validateLoginPassword = (password) => {
    const errs = {}

    if (!password)
        errs.password = 'Required';
    return errs;
}

export const validateRegistrationPassword = (password) => {
    const errs = {}

    if (!password)
        errs.password = 'Required';
    if (password.length < 5)
        errs.password = 'Password must be at least 5 characters long';

    return errs;
}

// export const validateUserName = (username) => {
//     const errors
//     if (!username)
//         return 'Required';
// }
