function deleteStudent(id){
    $.ajax({
        type: "DELETE",
        url: "http://localhost:7700/students/" + id,
        success: (res) => {
            window.location.reload()

        },
        error: (e) => {
            console.log("Error on delete student")
        }
    });
}

$(document).ready(function () {
    if(document.getElementById("editButton") != null) {
        document.getElementById("editButton").addEventListener("click", function(event){
            event.preventDefault()
            let id = document.getElementById("editNum").value
            console.log("------> :" + id)
            let name = document.getElementById("editNome").value
            if(name.trim() != ""){
                let student = {
                    "nome": name,
                    "git" : document.getElementById("editGit").value
                }
                for(let i=1;i<=8;i++){
                    student["tpc"+ i] = document.getElementById("edit_tpc_"+i).checked
                }
                console.log(student)
                $.ajax({
                    type: "PUT",
                    url: "http://localhost:7700/students/" + id,
                    data: student,
                    success: (res) => {
                        window.location.replace("http://localhost:7700/students/"+ id)
            
                    },
                    error: (e) => {
                        console.log("Error on delete student")
                    }
                });
            }else{
                alert("Name is empty")
            }
        
        
            
        
          });
            
    }
        
});
