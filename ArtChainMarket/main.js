let galeryImages = [

    {
        src :"./assets/gallery/image1.jpg",
        alt : "Thumnail Image"
    },
    {
        src : "./assets/gallery/image2.jpg",
        alt : "Thumnail Image"
    },
    // {
    //     src :"./assets/gallery/img1.png",
    //     alt : "Thumnail Image"
    // },
    {
        src : "./assets/gallery/image3.jpg",
        alt : "Thumnail Image"
    }
]
const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ]

const WeatherAPIKey = "1eca6edc981183ebe872170a9fc8ef8c"
const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric `

// menu
function menuHandler(){
    document.querySelector("#open-nav-menu").addEventListener('click',function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open")
      
    })
    document.querySelector("#close-nav-menu").addEventListener('click',function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open")
      
    })
}

// converting celsius to fahrnate

function celsiusToFahr(temptrature){
    let fahr = temptrature * (9/5) + 32
    
    return fahr
    
}


// greetings

function weatherHandler(){ 
    navigator.geolocation.getCurrentPosition(location => {
        let lat = location.coords.latitude;
        let longit = location.coords.longitude;
        let url = weatherAPI.replace("{lat}",lat)
        .replace("{lon}",longit).replace("{API key}",WeatherAPIKey)
        fetch(url)
        .then(responce => responce.json())
        .then(data => {
            
            const weatherCondition = data.weather[0].description
            const userLocation = data.name
            const temptrature = data.main.temp
            const celsiusMessage = `The weather is ${weatherCondition} in ${userLocation} and it's ${temptrature} C  outside `
            const fahrMessage = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(temptrature)} F outside `
            document.querySelector("#weather").innerHTML = celsiusMessage

            document.querySelector(".weather-group").addEventListener("click",function(e){
                if (e.target.id == "celsius"){
                    console.log('celsius clicked');
                    document.querySelector("#weather").innerHTML = celsiusMessage
            
                }else if (e.target.id == "fahr"){
                    console.log('farh clicked');
                    document.querySelector("#weather").innerHTML = fahrMessage
                }
            });
            
            

           
        
        })
       
       
    })
    
}


function greetingsHandler(){
    let  greetings;



let currenHour = new Date().getHours();
if (currenHour < 12 ){
        greetings="Good Morning "
}else if (currenHour < 19){
        greetings = "Good Afternoon"
}else if (currenHour < 24){
        greetings = "Good Night"
}
else{
    greetings = "Welcome ! "
}
document.querySelector("#greeting").innerHTML = greetings





}

// time section

function timeHandler (){
    setInterval(function(){
        let localTime = new Date();
    document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,"0");
    document.querySelector("span[data-time=minutes]").textContent=localTime.getMinutes().toString().padStart(2,"0");
    document.querySelector("span[data-time=seconds]").textContent=localTime.getSeconds().toString().padStart(2,"0");
    
    },1000)
}
// galery section
 
function galleryHandler(){
    let mainImg = document.querySelector("#gallery > img")
    let thumbnails = document.querySelector("#gallery .thumbnails")
    
    mainImg.src = galeryImages[0].src;
    mainImg.alt = galeryImages[0].alt;
    
    //<img src="./assets/gallery/image1.jpg" 
    //alt="Thumbnail Image 1" 
    //data-array-index="0" 
    //data-selected="true">
    
    galeryImages.forEach(function(image,index){
        let thumb = document.createElement("img");
        thumb.src = image.src
        thumb.alt = image.alt
        thumb.dataset.arrayIndex = index
        thumb.dataset.selected = index === 0 ? true : false ;
        thumb.addEventListener("click",function(e){
        
            selectedIndex = e.target.dataset.arrayIndex;
            selectedImage = galeryImages[selectedIndex];
            mainImg.src = selectedImage.src;
            mainImg.alt = selectedImage.alt;
            thumbnails.querySelectorAll("img").forEach(function(img){
                img.dataset.selected = false;
            })
            e.target.dataset.selected = true;
        })
         
    
        thumbnails.appendChild(thumb);
    })
}

// Product section 
function productPopulate(productList){
    let prodocutSection = document.querySelector(".products-area")
    prodocutSection.textContent ="";
    //run a loop through products and creat HTML elemtnt 
    productList.forEach(function(product,index){
        let productelement = document.createElement("div")
        productelement.classList.add("product-item")
    
    // Creating img for products 
        let productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt ="The image of " + product.title;
    // product details 
        let productDetails = document.createElement("div")
        productDetails.classList.add("product-details")    
    // h3 
        let productTitle = document.createElement("h3")  
        productTitle.classList.add("product-title") 
        productTitle.textContent = product.title
    // author
        let productAuthor= document.createElement("p")  
        productAuthor.classList.add("product-author") 
        productAuthor.textContent = product.author

        let priceTitle= document.createElement("p")  
        priceTitle.classList.add("product-author") 
        priceTitle.textContent ="price"

        let productPrice= document.createElement("p")  
        productPrice.classList.add("product-price") 
        productPrice.textContent =product.price > 0 ? "$"+ product.price.toFixed(2) : "Free"

    // adding to product details 
        productDetails.append(productTitle)  
        productDetails.append(productAuthor)  
        productDetails.append(priceTitle)
        productDetails.append(productPrice)
    // adding to child class
    productelement.append(productImg)
    productelement.append(productDetails)

    // adding to parent class    
    prodocutSection.append(productelement)
    })
}

function ProductHandler(){
    let prodocutSection = document.querySelector(".products-area")
    let freeProducts = products.filter(function(item){
        return !item.price || item.price <= 0 ;
    })
    let paidProducts = products.filter(function(item){
        return item.price > 0
    })
    
    productPopulate(products)

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;
    
    let productFiler = document.querySelector(".products-filter")
    productFiler.addEventListener("click",function(e){
        if (e.target.id === "all"){
            productPopulate(products)

        }else if(e.target.id === "paid"){
            productPopulate(paidProducts)
        }else if (e.target.id === "free"){
            productPopulate(freeProducts)
        }
    }) 
}

function footerHandler(){
    let currenYear = new Date().getFullYear()
    document.querySelector("footer").textContent = `Copyright © ${currenYear} Elegant Themes ® \n The HTML and CSS structure were adapted from templates provided  by Github. We appreciate and acknowledge the work of the original creators for their contribution to this project`
}

function weatherHandler(){ 
    navigator.geolocation.getCurrentPosition(location => {
        let lat = location.coords.latitude;
        let longit = location.coords.longitude;
        let url = weatherAPI.replace("{lat}",lat)
        .replace("{lon}",longit).replace("{API key}",WeatherAPIKey)
        fetch(url)
        .then(responce => responce.json())
        .then(data => {
            
            const weatherCondition = data.weather[0].description
            const userLocation = data.name
            const temptrature = data.main.temp
            const celsiusMessage = `The weather is ${weatherCondition} in ${userLocation} and it's ${temptrature} C  outside `
            const fahrMessage = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(temptrature)} F outside `
            document.querySelector("#weather").innerHTML = celsiusMessage
        
        })
       
    })

}


//page loader 
menuHandler();
weatherHandler()
greetingsHandler();
timeHandler();
galleryHandler();
ProductHandler();
footerHandler()
weatherHandler()