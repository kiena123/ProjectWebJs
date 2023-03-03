
const HandleTable = ( tableParent ) => {
    const allChildren = tableParent.querySelectorAll("tr>th")
    const countChildren = allChildren.length;

    const allCellTable = tableParent.querySelectorAll("tr>*");
    allCellTable.forEach(element => {
        element.style.width = `calc(100%/${countChildren})`;
    });
}

const allTable = document.querySelectorAll("table")

allTable.forEach(element => {
    HandleTable(element)
});