const fs = require("fs")

const loadData = () => {

    try {
        const loadFile = fs.readFileSync("dataFile.json").toString()
        return JSON.parse(loadFile)
    }

    catch {
        return []
    }

}

const saveData = (data) => {

    try {
        const saveFile = JSON.stringify(data)
        fs.writeFileSync("dataFile.json", saveFile)
    }

    catch {
        console.log("Saving Data Failed");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

const addContact = (id, fname, lname, age, city) => {

    const dFile = loadData()

    const checkDuplicatedId = dFile.filter((obj) => {
        return obj.id === id
    })

    if (checkDuplicatedId.length == 0) {

        dFile.push({
            id: id,
            fname: fname,
            lname: lname,
            age: age,
            city: city
        })

        saveData(dFile)
    }
    else {
        console.log("ID Existing");
    }
}

////////////////////////////////////////////////

const delContact = () => {

    const dFile = loadData()

    const arrLength = dFile.length

    const excludedIds = [2, 4, 6, 8];

    const itemsKept = dFile.filter(obj => !excludedIds.includes(obj.id));

    if (arrLength == itemsKept.length) {
        console.log("No Such Id")
    }
    else {
        console.log("deleted id's: ", excludedIds);
        console.log("kepped id's: ", itemsKept)
        saveData(itemsKept)
    }
}

////////////////////////////////////////////////

const readContact = () => {

    const dFile = loadData()

    const selectedIds = [2, 4, 5, 9];

    const itemsKeeped = dFile.filter(obj =>

        selectedIds.includes(obj.id));

    console.log(itemsKeeped);

}



////////////////////////////////////////////////

const listContacts = () => {

    const dFile = loadData()

    const contactsFullName = dFile.map((item) => {
        return item.fname + " " + item.lname + ", " + item.city
    })

    console.log(contactsFullName);

}

////////////////////////////////////////////////

module.exports = {
    addContact,
    delContact,
    readContact,
    listContacts
}
