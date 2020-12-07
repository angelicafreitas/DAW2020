function showImage(name,type) {
    if(type=='image/png' || type=='image/jpeg' ){
        var ficheiro = '<img src="/fileStore/' + name + '" width=80%/>'
    }
    else
        var ficheiro = $('<p>' + name + ', '+ type + '</p>')
    var download= '<div><a href="files/download/' + name + '">Download</a></div>'
    
    var fileObj = `
    <div class="w3-row w3-margin">
        <div class="w3-col s6">
            ${ficheiro}
        </div>
        <div class="w3-col s6 w3-border">
                <p>Filename: ${name}</p>
                <p>Mimetype: ${type}</p>
        </div
    </div>`
    
    $("#display").empty()
    $('#display').append(fileObj, download)
    $('#display').modal()
  }

function addFile(){
    var plus = `<div class="w3-row w3-margin-bottom">
        <div class="w3-col s3">
            <label class="w3-text-teal">Description</label>
        </div>
        <div class="w3-col s9 w3-border">
            <input class="w3-input w3-border w3-light-grey" type="text" name="desc">
        </div>
    </div>                
    <div class="w3-row w3-margin-bottom">
        <div class="w3-col s3">
            <label class="w3-text-teal">Select file </label>
        </div>
        <div class="w3-col s9 w3-border">
            <input class="w3-input w3-border w3-light-grey" type="file" name="myFile">
        </div>
    </div>`;
    $('#plusOne').append(plus)
  }
function deleteFile(name){
    $.ajax({
        type: "DELETE",
        url: "http://localhost:7702/files/" + name,
        success: (res) => {
            window.location.reload()
        },
        error: (e) => {
            console.log("Error on delete file")
        }
    });
}