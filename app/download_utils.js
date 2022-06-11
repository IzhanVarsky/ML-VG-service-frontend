function downloadBase64File(contentType, base64Data, fileName) {
    const link = document.createElement("a");
    link.href = `data:${contentType};base64,${base64Data}`;
    link.download = fileName;
    link.click();
}

function downloadTextFile(text, filename) {
    let link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
    link.download = filename;
    link.click();
}

module.exports = {
    downloadBase64File: downloadBase64File,
    downloadTextFile: downloadTextFile,
};