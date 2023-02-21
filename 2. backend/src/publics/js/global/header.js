
function HandleHeader() {
    /**
     *      Account
     */
    
    document.querySelector(".generalAccount").onclick = (e) => {
        document.querySelector(".listActionAccount").classList.toggle("hidden")
    }
}


export default HandleHeader