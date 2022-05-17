$("#add_dish").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_dish").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}
    
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    console.log(data)


    var request = {
        "url" : `https://3000-alissondmoura-iwaca1-pfdtf0q7v6o.ws-eu45.gitpod.io/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})


if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `https://3000-alissondmoura-iwaca1-pfdtf0q7v6o.ws-eu45.gitpod.io/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}