//
//
//console.log(aCopy);
//
//aCopy.querySelector("h2").textContent = "Dish Name : Lazania";
//aCopy.querySelector("li span").textContent = "Lazania";
//
//const whosYourDaddy = document.querySelector("main");
//
//whosYourDaddy.appendChild(aCopy);
//


fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        renderData(data);
    })

function renderData(jsonData) {

    jsonData.forEach(function (dish) {
        let template = document.querySelector("template").content;

        let aCopy = template.cloneNode(true);

        let starterParent = document.querySelector(".starter");
        const mainParent = document.querySelector("main");

        //                aCopy.querySelector("img").src= dish.;
        const imageName = dish.image; // this would be dynamic
        const base = "https://kea-alt-del.dk/t5/site/imgs/";
        const smallImg = base + "small/" + imageName + "-sm.jpg";
        const mediumImg = base + "medium/" + imageName + "-md.jpg";
        const largeImg = base + "large/" + imageName + ".jpg";
        aCopy.querySelector("img").src = smallImg;

        aCopy.querySelector("h4").textContent = dish.name;

        mainParent.appendChild(aCopy);
        console.log(dish);
    })

}









// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
