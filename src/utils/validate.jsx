export const checkValidData = (email, password) => {
    const isNameValid = name ? /^[a-zA-Z\s]{3,}$/.test(name.trim()) : true;
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);


    if (!isNameValid) return "Enter a valid full name.";
    if(!isEmailValid) return "Invalid email format.";
    if(!isPasswordValid) return "Password must be 8+ characters with uppercase, lowercase & number.";

    return null;
}