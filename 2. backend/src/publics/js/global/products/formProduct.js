import { HandleSubmitFormEvent } from "../configs/form.js"

const formProduct = document.getElementsByTagName("form")[0]
formProduct.onsubmit = HandleSubmitFormEvent