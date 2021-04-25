//Convert all input types to a string
function manageTypes(templateString, ...literals) {
    if (templateString == null) return ""; //Prevent error on nullish input

    //Return string from TemplateStringsArray
    if (Array.isArray(templateString)) {
        let convertedString = "";
        //Loop over array, adding each value to a string
        for (let index = 0; index < templateString.length; ++index) {
            convertedString += templateString[index] + (literals[index] || "");
        }
        return convertedString;
    }

    return templateString.toString(); //If given anything else, return as a string
}

export function stripIndent(templateString, ...literals) {
    const string = manageTypes(templateString, ...literals);

    //Find whitespace characters at the beginning of lines, fall back to empty array if falsey
    const indentArray = string.match(/^[ \t]*(?=\S)/gm) || [];

    //Get the number of whitespace characters
    const indents = indentArray.reduce(
        (accumulator, currentValue) =>
            Math.min(accumulator, currentValue.length),
        Infinity
    );

    return string
        .replace(new RegExp(`^[ \t]{${indents}}`, "gm"), "") //Trim whitespace
        .replace(/^[ \t]+/, "") //Trim the trailing first-line whitespace, if it exists
        .replace(/^\n/, ""); //Trim the first newline
}

export function stripAllIndents(templateString, ...literals) {
    const string = manageTypes(templateString, ...literals);

    return string
        .replace(/^[ \t]+/gm, "") //Trim whitespace
        .replace(/^\n/, ""); //Trim the first newline
}

export function oneLine(templateString, ...literals) {
    const string = manageTypes(templateString, ...literals);

    return string
        .replace(/^\s+/gm, " ") //Trim all excess whitespace, replacing them with one space
        .replace(/^\s/, "") //Trim the extra beginning space
        .replace(/\n/g, ""); //Trim all newlines
}

export function oneLineConcatenate(templateString, ...literals) {
    const string = manageTypes(templateString, ...literals);

    return string
        .replace(/^\s+/gm, "") //Trim all excess whitespace
        .replace(/\n/g, ""); //Trim all newlines
}
