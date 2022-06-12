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

async function getJSON(data, callback) {
    const formData = new FormData()
    formData.append("svg", data);
    // TODO: сделать прогресс бар, хотя бы просто <progress/>
    $.ajax({
        url: "http://localhost:5001/svg_to_json",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: (response) => {
            console.log('SUCC', response);

            if (callback) {
                callback(response.result);
            } else {
                downloadTextFile(JSON.stringify(response.result), "obj.json");
            }
        },
        error: (e) => {
            console.log('ERR', e);
        }
    });
};

module.exports = {
    downloadBase64File: downloadBase64File,
    downloadTextFile: downloadTextFile,
    getJSON: getJSON,
};