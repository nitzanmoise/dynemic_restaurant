window.addEventListener("DOMContentLoaded", fetchCategories)
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});



function fetchCategories(){
  fetch("https://kea-alt-del.dk/t5/api/categories")
  .then(function (response) {
      return response.json()
  })
  .then(function (data) {
      createCategories(data);
  })
}

function createCategories(data){

  data.forEach(category => {
    //create links
    const a = document.createElement("a");
    a.textContent = category;
    a.className = "nav-item"
    a.href = `#${category}`
const navBar = document.querySelector(".nav-bar");
navBar.appendChild(a);


    //create sections
    const section = document.createElement("section");
    section.id = category;

    const headline = document.createElement("h3");
    headline.textContent = category;

    section.appendChild(headline);
    const mainParent = document.querySelector("main");
    mainParent.appendChild(section);
  });
fetchProductList()
}

function fetchProductList(){
  fetch("https://kea-alt-del.dk/t5/api/productlist")
      .then(function (response) {
          return response.json()
      })
      .then(function (data) {
          renderData(data);
      })
}


function renderData(jsonData) {

    jsonData.forEach(function (dish) {
        let template = document.querySelector("template").content;

        let aCopy = template.cloneNode(true);



        const imageName = dish.image; // this would be dynamic
        const base = "https://kea-alt-del.dk/t5/site/imgs/";
        const smallImg = base + "small/" + imageName + "-sm.jpg";
        const mediumImg = base + "medium/" + imageName + "-md.jpg";
        const largeImg = base + "large/" + imageName + ".jpg";
        aCopy.querySelector(".dish-img").src = smallImg;

        aCopy.querySelector("h4").textContent = dish.name;
        aCopy.querySelector(".dish-desc").textContent = dish.shortdescription;
      let price =  aCopy.querySelector(".price");
      price.textContent = dish.price

      if (dish.discount) {
        aCopy.querySelector(".price-text").style.textDecoration = "line-through"
        aCopy.querySelector(".prices .discount-text").style.display = "block";
        aCopy.querySelector(".discount-text span").textContent = dish.price - dish.price * dish.discount/100;

      }


        if (dish.vegetarian) {
            aCopy.querySelector(".vegetarian-img").src = "https://img.icons8.com/ios-glyphs/30/000000/vegetarian-mark.png";
        }
        if (dish.soldout) {
            aCopy.querySelector(".soldout").style.display = "block";
        }
        aCopy.querySelector(".dish-card").addEventListener("click", () => {
          console.log("click", dish);
          fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showModalDetails);
        });
        let parent = document.querySelector(`section#${dish.category}`);
        parent.appendChild(aCopy);

    })

}

function showModalDetails(data) {
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description").textContent = data.longdescription;
  const imageName = data.image; // this would be dynamic
  const base = "https://kea-alt-del.dk/t5/site/imgs/";
  const smallImg = base + "small/" + imageName + "-sm.jpg";
  const mediumImg = base + "medium/" + imageName + "-md.jpg";
    modal.querySelector(".modal-image").src = smallImg;
    let price =  modal.querySelector(".price");
    price.textContent = data.price
    if (data.vegetarian) {
        modal.querySelector(".vegetarian-img").src = "https://img.icons8.com/ios-glyphs/30/000000/vegetarian-mark.png";
    }
    if (data.soldout) {
        modal.querySelector(".soldout").style.display = "block";
    }
    if (data.discount) {
      modal.querySelector(".price").style.textDecoration = "line-through"
      modal.querySelector(".discount-text").style.display = "block";
      modal.querySelector(".discount-text span").textContent = data.price - data.price * data.discount/100;

    }
  //...
  modal.classList.remove("hide");
}
