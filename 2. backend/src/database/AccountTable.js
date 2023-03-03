import promisePool from "../configs/connectDB"

const columnTypes = {
    "email": "string",
    "password": "number"
}

const showError = (error) => {
    console.log("*** Error Query ***")
    Object.keys(error).forEach(element => {
        console.log(` ${element} : ${error[element]} `)
    });
    console.log("*** --- ***")
}

class AccountTable {
    async selectAll(){
        let sqlString = "Select * from accounts";

        try {
            const [rows, fields] = await promisePool.query(sqlString)
            return [rows, fields]
        } catch (error) {
            showError(error)
            return HandleError(error)
        }

    }

    async insert(values = {}, HandleError = (error) => {}){
        const keyValues = Object.keys(values);
        let colunmsString = ""
        let valuesString = ""
        for (let index = 0; index < keyValues.length; index++) {
            const element = keyValues[index];
            // String list columns in sql
            colunmsString += ((index > 0) ? " , " : "") + `${element}`
            // String list values in sql 
            switch (columnTypes[element]) {
                case "string":
                    valuesString += ((index > 0) ? " , " : "") + `'${values[element]}'`
                    break;
                case "number":
                    valuesString += ((index > 0) ? " , " : "") + `${values[element]}`
                    break;
                default:
                    console.log("Error from AccountTable/insert")
                    break;
            }
        }

        const sqlString = `Insert into accounts( ${colunmsString} ) values( ${valuesString} )`
        
        try {
            const [rows, fields] = await promisePool.query(sqlString)
            return [rows, fields]
        } catch (error) {
            showError(error)
            return HandleError(error)
        }

    }

    async selectAllWhere(whereObjects = {}, HandleError = (error) => {}){
        let sqlString = "Select * from accounts";

        if(Object.keys(whereObjects).length > 0){
            sqlString += " where ";
            const keyValues = Object.keys(whereObjects)
            for (let index = 0; index < keyValues.length; index++) {
                const element = keyValues[index];

                switch (columnTypes[element]) {
                    case "string":
                        sqlString += ((index > 0) ? "and " : "") + `${element} = '${whereObjects[element]}'`
                        break;
                    case "number":
                        sqlString += ((index > 0) ? "and " : "") + `${element} = ${whereObjects[element]}`
                        break;
                    default:
                        console.log("Error from AccountTable/SelectAllWhere")
                        break;
                }
            }
        }

        try {
            const [rows, fields] = await promisePool.query(sqlString)
            return [rows, fields]
        } catch (error) {
            showError(error)
            return HandleError(error)
        }
    }
}

export default new AccountTable