const copyToClipboard = document.querySelector(".copy-to-clipboard");
const sourceCode = document.querySelector("#source-code");

copyToClipboard.addEventListener("click", function () {
    navigator.clipboard.writeText(sourceCode.innerText);

    copyToClipboard.classList.add("active");

    setTimeout(function () {
        copyToClipboard.classList.remove("active");
    }, 3000);
});