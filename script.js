//source : https://stackoverflow.com/a/65390710/15023649
function cipherEncode(str, rotnum) {
    rotnum = parseInt(rotnum)
    // str = str.toUpperCase();
    str = str.replace(/[a-z]/g, rot13Lower);
    return str.replace(/[A-Z]/g, rot13Upper);

    function rot13Upper(correspondance) {
        const charCode = correspondance.charCodeAt();
        //A = 65, Z = 90
        return String.fromCharCode(
            ((charCode + rotnum) <= 90) ? charCode + rotnum
                : (charCode + rotnum) % 90 + 64
        );

    }
    function rot13Lower(correspondance) {
        const charCode = correspondance.charCodeAt();
        //A = 97, Z = 122
        return String.fromCharCode(
            ((charCode + rotnum) <= 122) ? charCode + rotnum
                : (charCode + rotnum) % 122 + 96
        );

    }
}

//source: https://stackoverflow.com/a/33424474/15023649
function removeFadeOut(el, speed) {
    var seconds = speed / 1000;
    el.style.transition = "opacity " + seconds + "s ease";

    el.style.opacity = 0;
    setTimeout(function () {
        el.style.visibility = "hidden";
    }, speed);
    el.style.visibility = "hidden"
    el.style.opacity = "1"
}

//setting the document variables
var inputText = document.querySelector("#userInput");
const output = document.querySelector("#output");
var rotnum = document.querySelector("#rotnum");

//text processing function
function textProcessing() {
    if (inputText.value.length == 0 ){
        alert("Oi enter something you fool")
    }
    else if(rotnum.value.length == 0){
        alert("Oi enter the cipher number/secret number")
    }
    else if (rotnum.value < 0 || rotnum.value > 26) {
        alert("The range for value should be from 0-25")
    }
    else {

        // to encode
        if (document.querySelector("#encode").checked) {
            output.value = (cipherEncode(inputText.value, rotnum.value));
        }

        //to decode
        else if (document.querySelector("#decode").checked) {
            const rotnumvalue = rotnum.value;

            //if rotnum is 13
            if (rotnumvalue == 13) {
                output.value = (cipherEncode(inputText.value, rotnum.value));
            }

            //if rotnum is a even number, then the loop must run 12 times
            else if (rotnumvalue % 2 == 0) {
                var newtext = inputText.value;
                for (var i = 0; i < 12; i++) {
                    newtext = (cipherEncode(newtext, rotnum.value));
                    console.log(newtext)
                }
                output.value = newtext;
            }

            //if rotnum is odd number, then the loop must run 25 times
            else if (rotnumvalue % 2 != 0) {
                var newtext = inputText.value;
                for (var i = 0; i < 25; i++) {
                    newtext = (cipherEncode(newtext, rotnum.value));
                    console.log(newtext)
                }
                output.value = newtext;
            }
        }
    }
}

rotnum.onkeyup = function () {
    if (rotnum.value == 13) {
        document.querySelector("#encode").disabled = true;
        document.querySelector("#decode").disabled = true;
    }
    else if (rotnum.value != 13) {
        document.querySelector("#encode").disabled = false;
        document.querySelector("#decode").disabled = false;
    }
}

//on key press change to uppercase and on enter do the function
document.querySelector("#userInput").onkeyup = function () {
    // document.querySelector("#userInput").value = document.querySelector("#userInput").value.toUpperCase();

    if (event.key === "Enter") {
        textProcessing();
    }
}

//on pressing the button do the function
document.querySelector("#push").onclick = function () {
    textProcessing();
}

//copy the values
document.querySelector("#copy").onclick = function () {
    const text_alert = document.querySelector("#copy-alert");
    navigator.clipboard.writeText(output.value);
    text_alert.style.visibility = "visible";
    // text_alert.style.opacity = '0';

    setTimeout(() => {
        removeFadeOut(text_alert, 1000)
    }, 2000)

}