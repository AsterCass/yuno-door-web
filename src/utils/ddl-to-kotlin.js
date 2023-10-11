import {Parser} from 'sql-ddl-to-json-schema'

//to delete
const sql = `
CREATE TABLE users_some_abc (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(255) NOT NULL,
  deleted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at json COMMENT 'abdcfdsjfds' ,
  update_time datetime NOT NULL COMMENT '更新时间',
  rent_money_month decimal(11,2) DEFAULT NULL COMMENT '月支付租金',
  rent_money_months DOUBLE(11,2) DEFAULT NULL COMMENT '月支付租金',
  PRIMARY KEY (id) 
) ENGINE MyISAM COMMENT 'All system users';

ALTER TABLE users ADD UNIQUE KEY unq_nick (nickname);
`;

//sql data type to kotlin map
//https://github.com/duartealexf/sql-ddl-to-json-schema/blob/master/src/mysql/formatter/compact/models/datatype.ts
let sqlDataType2KotlinMap = new Map([
    ["int", "Int"], ["bit", "Int"], ["binary", "Int"], ["bit", "Int"],
    ["decimal", "BigDecimal"], ["float", "BigDecimal"], ["double", "BigDecimal"], ["boolean", "Boolean"],
    ["date", "Date"], ["time", "Date"], ["datetime", "Date"], ["timestamp", "Date"],
    ["blob", "String"], ["text", "String"], ["char", "String"], ["varchar", "String"],
])

let defaultValueMap = new Map([
    ["Int", " = 0"], ["String", " = \"\""], [""], ["Double", " = 0.0"], ["BigDecimal", " = BigDecimal.ZERO"],
    ["Boolean", " = false"], ["Date", " = Date()"], ["LocalDateTime", " = LocalDateTime.now()"]
])

//kotlin code result
let resCode = ""

//options
export let convertOptions = {
    packageName: "com.aster.extend",
    isLocalDateTime: false,
    isNeedComment: true,
    isCamelCase: true,
    isBigDecimal: true,
    isAllNullable: false,
    isSetDefaultValue: true,
}

//parser init
const parser = new Parser('mysql');
let tableObj = {}

function parseSql() {
    try {
        const compactJsonTablesArray = parser.feed(sql).toCompactJson(parser.results);
        tableObj = compactJsonTablesArray[0]
    } catch (err) {
        return false
    }
    return true
}

//change line
function wrapWrite(text, textOther = "") {
    if (text) {
        return text + "\n" + textOther
    }
    return textOther
}

function camelBuilder(name, firstUpper = false) {
    if (!convertOptions.isCamelCase) {
        return name
    }
    let nameArr = name.split('')
    let upperIndex = firstUpper ? 0 : -1
    for (let index = 0; index < name.length; ++index) {
        if (upperIndex === index) {
            nameArr[index] = nameArr[index].toUpperCase()
            upperIndex = -1
        }
        if (nameArr[index] === '_') {
            upperIndex = index + 1
        }
    }
    return nameArr.join('').replaceAll('_', '')
}

//add package
function addPackage() {
    //package
    resCode = wrapWrite(resCode, 'package ' + convertOptions.packageName)
    //end
    resCode = wrapWrite(resCode)
}

function addImport() {
    const dataTypeArr = tableObj.columns.map(col => col.type.datatype)
    //date time
    if (dataTypeArr.includes("timestamp")) {
        if (convertOptions.isLocalDateTime) {
            resCode = wrapWrite(resCode, "import java.time.LocalDateTime")
        } else {
            resCode = wrapWrite(resCode, "import java.util.Date")
        }
    }
    //decimal
    if (dataTypeArr.includes("decimal") && convertOptions.isBigDecimal) {
        resCode = wrapWrite(resCode, "import java.math.BigDecimal")
    }
    //end
    resCode = wrapWrite(resCode)
}

function addProperty() {
    for (let index in tableObj.columns) {
        let curColumn = tableObj.columns[index]

        let curName = camelBuilder(curColumn.name)
        let curType = sqlDataType2KotlinMap.get(curColumn.type.datatype)
        let isAllowNull = curColumn.options.nullable || convertOptions.isAllNullable
        let isAllowNullNotation = isAllowNull ? "?" : ""

        if (convertOptions.isLocalDateTime && "Date" === curType) {
            curType = "LocalDateTime"
        }
        if (!convertOptions.isBigDecimal && "BigDecimal" === curType) {
            curType = "Double"
        }
        if (!curType) {
            curType = "String"
        }

        if (convertOptions.isNeedComment) {
            let comment = curColumn.options.comment ? curColumn.options.comment : curName
            resCode = wrapWrite(resCode, `\n\t/**\n\t * ${comment}\n\t */`)
        }

        let defaultValueStr = " = null"
        if (convertOptions.isSetDefaultValue && !isAllowNull) {
            defaultValueStr = defaultValueMap.get(curType)
        }

        resCode = wrapWrite(resCode,
            `\tvar ${curName}: ${curType}${isAllowNullNotation}${defaultValueStr},`)
    }
}

function addBody() {
    resCode = wrapWrite(resCode, "data class " +
        camelBuilder(tableObj.name, true) + " (")
    addProperty()
    resCode = wrapWrite(resCode, ")")
}

function buildResCode() {
    addPackage()
    addImport()
    addBody()
    return resCode
}

export function test() {
    if (parseSql()) {
        console.log(buildResCode())
    }
}