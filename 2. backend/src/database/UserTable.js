import promisePool from "../configs/connectDB"

const typeColumns = {
    "email": "string",
    "name": "string",
    "age": "number",
    "address": "string"
}

const showError = (error) => {
    console.log("*** Error Query ***")
    Object.keys(error).forEach(element => {
        console.log(` ${element} : ${error[element]} `)
    });
    console.log("*** --- ***")
}


class UserTable {
    async insert(values, HandleError = (error) => {}){
        const keyValues = Object.keys(values);
        let colunmsString = ""
        let valuesString = ""

        for (let index = 0; index < keyValues.length; index++) {
            const element = keyValues[index];
            // String list columns in sql
            colunmsString += ((index > 0) ? " , " : "") + `${element}`
            // String list values in sql
            switch (typeColumns[element]) {
                case "string":
                    valuesString += ((index > 0) ? " , " : "") + `'${values[element]}'`
                    break;
                case "number":
                    valuesString += ((index > 0) ? " , " : "") + `${values[element]}`
                    break;
                default:
                    console.log("Error from UserTable/insert")
                    break;
            }
        }

        const sqlString = `Insert into users(${colunmsString} ) values( ${valuesString} )`
        
        try {
            const [rows, fields] = await promisePool.query(sqlString)
            return [rows, fields]
        } catch (error) {
            showError(error)
            return HandleError(error)
        }
    }
}

export default new UserTable