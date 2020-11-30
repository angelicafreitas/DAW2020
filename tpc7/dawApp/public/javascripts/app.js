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
