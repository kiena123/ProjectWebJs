import { HandleSubmitFormEvent } from "./global/configs/form.js"

const formLogin = document.getElementsByTagName("form")[0]
formLogin.onsubmit = HandleSubmitFormEvent