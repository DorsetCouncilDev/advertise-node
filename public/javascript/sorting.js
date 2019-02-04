function sortDocuments(type) {
    
    // get value of selected sorting option e.g. price-high
    type = type.value;

    // get collection of HTML elements
    var documentCards = document.getElementsByClassName("asset-card");

    // put collection into array, for sorting to work.
    var documentCardsArray = [];
    for (var i = 0; i < documentCards.length; i++)
        documentCardsArray.push(documentCards[i])

    // Sort
    documentCardsArray.sort(function (a, b) {
        var aPrice = null;
        var bPrice = null;

        if (typeof a.getElementsByClassName("price") === "undefined" || typeof a.getElementsByClassName("price")[0] === "undefined") {
            if (type == "price-low") 
              return 1;
           

        } else {
            aPrice = a.getElementsByClassName("price")[0].innerHTML;
            aPrice = Number(aPrice);
        }
        if (typeof b.getElementsByClassName("price") === "undefined" || typeof b.getElementsByClassName("price")[0] === "undefined") {
            if (type == "price-low") 
                return -1;
          
        } else {
            bPrice = b.getElementsByClassName("price")[0].innerHTML;
            bPrice = Number(bPrice);
        }

        if (type == "price-low") {
            if (aPrice > bPrice)
                return 1;
            else if (aPrice < bPrice)
                return -1
            else
                return 0;
        } else if (type == "price-high") {
            if (aPrice < bPrice)
                return 1;
            else if (aPrice > bPrice)
                return -1
            else
                return 0;
        }
    });

    var documentsContainer = document.getElementById("assetsContainer");
    
    // clear all cards
    while (documentsContainer.firstChild)
        documentsContainer.removeChild(documentsContainer.firstChild);

    // insert new sorted list of cards
    for (var d = 0; d < documentCardsArray.length; d++) {
        documentsContainer.appendChild(documentCardsArray[d]);
    }
}