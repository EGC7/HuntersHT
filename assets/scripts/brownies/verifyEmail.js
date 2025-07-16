
function emailIsValid(email){
    
    const mail = `${email}`;

    if ( (!mail.includes("@")) || (mail.includes(" "))){
        console.warn("Primary Not valid Email.");
        return false;
    }
    
    const namedEmail = mail.split("@")[0];
    const domain = mail.split("@")[1];

    if ( (namedEmail.length < 1) || (domain.length < 1) || (!domain.includes(".")) || (domain.split(".")[1].length < 1)){
        console.warn("Secondary Not valid Email.");
        return false;
    }

    console.log(`Named: ${namedEmail} | Domain: ${domain}`);

    return true;
}

export { emailIsValid };