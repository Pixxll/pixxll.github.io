const charset = "abcdefghijklmnopqrstuvwxyzäöüABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ1234567890?!&$+-*/%=(){}[]<>.,;:`_ \n\r\t\"\\'";
const abc = "ghijklmnopqrstuvwxyz";
function encode() {
    let output = "";
    
    const charsetArray = [];
    let char = "";

    for (let i = 0; i < charset.length; i++) {

        charsetArray.push(charset.charAt(i));

    }

    let input = document.getElementById("encodeInput").value;
    randomInt = Math.floor(Math.random() * 999 + 1);

    output += (input.length * randomInt).toString(16);

    char = abc.charAt(Math.floor(Math.random() * abc.length));
    output += char;

    output += randomInt.toString(16);
    
    char = abc.charAt(Math.floor(Math.random() * abc.length));
    output += char;

    
    for (let i = 0; i < input.length; i++) {

        let letterPos = charsetArray.indexOf(input.charAt(i)) + 1;
        let number = letterPos * (i + 1) * randomInt;
        let hex = number.toString(16);

        output += hex;
        char = abc.charAt(Math.floor(Math.random() * abc.length));
        output += char;
        
    }

    document.getElementById("encodeOutput").innerHTML = output;
}

function decode() {
    
    let input = document.getElementById("decodeInput").value;
    let output = "";
    let chars = [];

    let char = "";

    for (let i = 0; i < input.length; i++) {
        
        if (abc.includes(input.charAt(i))) {
            
            let dec = parseInt(char, 16);

            chars.push(dec);
            char = "";

        } else {

            char += input.charAt(i);

        }

    }

    let length = chars.shift();
    let factor = chars.shift();
    length /= factor;

    for (let i = 0; i < chars.length; i++) {

        let number = (chars[i] / factor / (i + 1)) - 1;
        output += charset.charAt(number);

    }

    document.getElementById("decodeOutput").innerHTML = output;
}