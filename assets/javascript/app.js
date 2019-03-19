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
    var queryURL="https://api.giphy.com/v1/gifs/search?q="+gif+"&api_key=B97kzVgOxtskdBPslnAb7Acfyfs9cD40&limit=10";
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){
        //console.log(response);
        $("#gifHolder").empty();
        var results=response.data;
        for (var i=0; i<results.length; i++){
            //Gif Ratings
            var imgRating =$("<p>");
            imgRating.text("Rating: "+ results[i].rating);
            //console.log(results[i].rating);

            //Gifs
            var gifImg=$("<img>");
            gifImg.addClass("gif");
            gifImg.attr("src", results[i].images.fixed_height.url);
            gifImg.attr("data-state:", "still");
            var gifURL=gifImg.attr("src");
            gifImg.attr("src", gifURL.replace(".gif", "_s.gif"))
        

            $("#gifHolder").prepend(gifImg);
            $("#gifHolder").prepend(imgRating);
        }
    });
}

function animateGif(){
    var state = $(this).attr("data-state");
    var url=$(this).attr("src");

    if (state === "still") {
        $(this).attr("src", url.replace(".gif", "_s.gif"));
        $(this).attr("data-state", "animate");
      } 
    else {
        $(this).attr("src", url.replace("_s.gif",".gif"));
        $(this).attr("data-state", "still");
      }
}

//--------------- TEST FUNCTIONS ----------------
createButtons();

$(document).on("click", ".gifButton", displayGif);
createButtons();

$(document).on("click", ".gif", animateGif);

