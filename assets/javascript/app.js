// Initial array of gifs
var gifs=[
    "kim kardashian",
    "khloe kardashian", 
    "kourtney kardashian", 
    "kris jenner", 
    "kendall jenner",
    "kylie jenner", 
    "rob kardashian", 
    "caitlyn jenner"];

//--------------------SET  FUNCTIONS -----------------------------

// Create function to turn initialGifs[] into buttons 
function createButtons (){
    $("#buttonHolder").empty();

    for (var i=0; i<gifs.length; i++){
        var a=$("<button>");
        a.addClass("gifButton");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttonHolder").append(a);
    }
}

// Create function that will add user-entered buttons
$("#addGif").on("click", function(){
    event.preventDefault();
    var inputGif=$("#gifInput").val().trim();
    gifs.push(inputGif);
    createButtons();
});

//Create function to display gifs of 

function displayGif(){
    var gif=$(this).attr("data-name");
    var apiKey="B97kzVgOxtskdBPslnAb7Acfyfs9cD40";
    var queryURL="http://api.giphy.com/v1/gifs/search?q="+gif+"&api_key=B97kzVgOxtskdBPslnAb7Acfyfs9cD40&limit=10";
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var results=response.data;
        for (var i=0; i<results.length; i++){
            var gifImg=$("<img>");
            gifImg.attr("src", results[i].images.fixed_height.url);
            gifImg.addClass("gifoutput");
            $("#gifHolder").prepend(gifImg);
        }
    });
}



//--------------- TEST FUNCTIONS ----------------
createButtons();

$(document).on("click", ".gifButton", displayGif);
createButtons();

