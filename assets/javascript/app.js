$ (function(){

    var drinks = ["Water", "Milk", "Sprite", "Coca-cola", "Fanta", "Coconut Water",
        "Orange Juice", "Koolaid", "Capri-sun", "Gatorade"]
    gifsHere = " "

    function renderButtons() {

        $("#drinksView").empty();
        for (var i = 0; i < drinks.length; i++) {

            var newBtn = $("<button>");

            newBtn.addClass("drink");
            newBtn.attr("data-name", drinks[i]);
            newBtn.text(drinks[i]);
            $("#drinksView").append(newBtn);
        }
        $("#drink-input").focus();

    }

    renderButtons();

    $("#addDrink").on("click", function () {

        event.preventDefault();

        var drink = $("#drink-input").val().trim();

        drinks.push(drink);

        renderButtons();

    });

    $(document).on("click", "button", function () {

        $('#gifsHere').empty();
        var d = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + d 
        + "&api_key=Gri90F1HSQj0aMUCoIuLk8OVBcrY89R6&limit=30";

        $.get(queryURL)

            .done(function (hello) {
                console.log(hello);

                var results = hello.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var gifImage = $("<img>");

                    gifImage.attr("src", results[i].images.fixed_height_still.url)
                        .attr("data-still", results[i].images.fixed_height_still.url)
                        .attr("data-animate", results[i].images.fixed_height.url)
                        .attr("data-state", "still")
                        .addClass("showImage");
                    gifDiv.append(p)
                        .append(gifImage);

                    $("#gifsHere").prepend(gifDiv);
                }

            });
    });

    $(document).on("click", ".showImage", function () {

        var state = $(this).data("state");
        if (state == "still") {
            $(this).attr("src", $(this).data("animate"))
                .data("state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"))
                .data("state", "still");
        }

    });

});