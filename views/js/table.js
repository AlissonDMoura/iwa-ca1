function draw_table(){
    $("#results").empty();
    
    $.getHTMLuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html) {
                $("#results").append(html);
                select_row();
            }
        });

    };
    $.getHTMLuncached("/get/html");
    //utilizes the results created in index.js and create a table as per xml instructions, informed as per function module.
};


function append(){
    $.ajax({
        type: "POST",
        url: '/post/json',
        dataType: 'json',
        contentType: 'application/json',
        data: '{"sec_n": "' + $("#section").val() + '", "item":"' + $("#item").val() + '", "price":"' + $("#price").val() +  '", "type":"' + $("#type").val() + '"}',
        async: false,
        success: setTimeout(draw_table, 1000)
        //module append the data specified in index.js in synchronous manner.
    });
};

function select_row()
{
    $("#menuTable tbody tr[id]").click(function ()
    {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        var sec = $(this).prevAll("tr").children("td[colspan='4']").length - 1;
        var ent = $(this).attr("id") - 1;
        delete_row(sec, ent);
        //this function checks the Id in the table that will be used to delete, the number of columns is important and has to be exact or wont be found
    })

};

function delete_row(sec, ent){
    $("#delete").click(function()
    {
        $.ajax(
            {
                url: "/post/delete",
                type: "POST",
                dataType: 'json',
                contentType: 'application/json',
                data: '{"sec": "' + sec + '", "ent": "' + ent + '"}',
                cache: false,
                success: setTimeout(draw_table, 1000)
                //deletes the information selected 
            }
        )
    })
};

$(document).ready(function(){
    draw_table();
    //if the document is finished it calls the table drawers.
});