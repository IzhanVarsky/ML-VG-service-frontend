function downloadBase64File(contentType, base64Data, fileName) {
    const downloadLink = document.createElement("a");
    downloadLink.href = `data:${contentType};base64,${base64Data}`;
    downloadLink.download = fileName;
    downloadLink.click();
}

function downloadTextFile(text, filename) {
    let element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    element.download = filename;
    element.click();

}

module.exports = {
    downloadBase64File: downloadBase64File,
    downloadTextFile: downloadTextFile,
};