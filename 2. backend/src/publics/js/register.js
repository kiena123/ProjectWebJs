import { HandleSubmitFormEvent } from "./global/configs/form.js"

// Check re-password
const formRegister = document.getElementsByTagName("form")[0]
formRegister.onsubmit = (e) => {
    e.preventDefault();
    const password = document.getElementById("password")
    const re_password = document.getElementById("re_password")

    
    if(password.value != re_password.value){
        document.getElementById("messNotify").textContent = "2 mat khau khong khop nhau"
    } else {
        HandleSubmitFormEvent(e)
    }
}