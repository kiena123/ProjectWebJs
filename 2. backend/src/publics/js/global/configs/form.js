export const HandleSubmitFormEvent = (e) => {
    e.preventDefault();

    const inputForm = e.target.querySelectorAll(".rowForm>input");
    const formData = {};

    inputForm.forEach((element)=> {
        formData[element.name] = element.value
    })
    
    $.ajax({
        method: e.target.method,
        url: e.target.action,
        data: formData,
    }).done((result) => {
        if(Object.keys(result).length > 0){
            document.getElementById("messNotify").textContent = result.message
        } else {
            window.location.replace("./");
        }
    })
}