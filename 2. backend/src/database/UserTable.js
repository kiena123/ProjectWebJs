import promisePool from "../configs/connectDB"

const tableName = "users"

const columnTypes = {
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
    /**
     *          Select
     */
    async select(sqlString, HandleError = (error) => {}){
        try {
            const [rows, fields] = await promisePool.query(sqlString)
            return [rows, fields]
        } catch (error) {
            showError(error)
            return HandleError(error)
        }
    }

    async selectAllLimit(limit, HandleError = (error) => {}){
        const sqlString = `Select * from ${tableName} limit ${limit.start}, ${limit.end}`;

        try {
            const [rows, fields] = await promisePool.query(sqlString)
            return [rows, fields]
        } catch (error) {
            showError(error)
            return HandleError(error)
        }
    }

    /**
     *          Insert 
     */
    async insert(values, HandleError = (error) => {}){
        // keyValues : List column Table
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
                    console.log("Error from UserTable/insert")
                    break;
            }
        }

        const sqlString = `Insert into ${tableName}(${colunmsString} ) values( ${valuesString} )`
        
        try {
            const [rows, fields] = await promisePool.query(sqlString)
            return [rows, fields]
        } catch (error) {
            showError(error)
            return HandleError(error)
        }
    }

    /**
     *          Delete
     */
    async delete(values, HandleError = (error) => {}){
        const keyValues = Object.keys(values);
        let whereString = ""

        for (let index = 0; index < keyValues.length; index++) {
            const element = keyValues[index];
            
            switch (columnTypes[element]) {
                case "string":
                    whereString += ((index > 0) ? "and " : "") + `${element} = '${whereObjects[element]}'`
                    break;
                case "number":
                    whereString += ((index > 0) ? "and " : "") + `${element} = ${whereObjects[element]}`
                    break;
                default:
                    console.log("Error from UserTable/delete")
                    break;
            }
        }

        const sqlString = `Delete from ${tableName} where ${whereString} )`

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