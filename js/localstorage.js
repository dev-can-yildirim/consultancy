export function saveEmailToLocalStorage(email) {
    if (!email || email.trim() === "") {
        return { success: false, message: "Lütfen geçerli bir email adresi giriniz." };
    }

    const storedEmails = localStorage.getItem('newsletterEmails');
    const emailList = storedEmails ? JSON.parse(storedEmails) : [];

    if (emailList.includes(email)) {
        return { success: false, message: "Bu email adresi zaten kayıtlı!" };
    }

    emailList.push(email);

    localStorage.setItem('newsletterEmails', JSON.stringify(emailList));

    return { success: true, message: "Başarıyla abone oldunuz!" };
}