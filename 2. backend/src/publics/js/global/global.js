
/**
 *      Header
 */

// Account
document.querySelector(".generalAccount").onclick = (e) => {
    document.querySelector(".listActionAccount").classList.toggle("hidden")
}

/**
 *      Category
 */

// titleGroupCategory
const titleGroupCategorys = document.querySelectorAll(".titleGroupCategory")
titleGroupCategorys.forEach((element) => {
    element.onclick = (e) => {
        const listGroupCategory = element.parentElement.querySelector(".listGroupCategory")
        if(listGroupCategory){
            listGroupCategory.classList.toggle("hidden")
        }
    }
})


/**
 *      Footer
 */