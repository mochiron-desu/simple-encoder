//source : https://stackoverflow.com/a/65390710/15023649
function cipherEncode(str) {
    str = str.toUpperCase();
    return str.replace(/[A-Z]/g, rot13);

    function rot13(correspondance) {
        const charCode = correspondance.charCodeAt();
        //A = 65, Z = 90
        return String.fromCharCode(
            ((charCode + 13) <= 90) ? charCode + 13
                : (charCode + 13) % 90 + 64
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

//text processing function
function textProcessing() {
    if (inputText.value.length == 0) {
        alert("Oi enter something you fool")
    }
    else {
        inputText.value = (inputText.value).toUpperCase()
        output.value = (cipherEncode(inputText.value));
    }
}


//on key press change to uppercase and on enter do the function
document.querySelector("#userInput").onkeyup = function () {
    document.querySelector("#userInput").value = document.querySelector("#userInput").value.toUpperCase();

    if (event.key === "Enter"){
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