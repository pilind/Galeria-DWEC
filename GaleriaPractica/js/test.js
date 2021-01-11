"use strict";
let g1 = Gallery.getInstance();

//Getter-Setter title
g1.title = "Galeria de imagenes";
console.log("Getter title");
console.log(g1.title);

let a1 = new Author("author1", "author1@gmail.com");
let a2 = new Author("author2", "author2@gmail.com");
let a3 = new Author("author3", "author3@gmail.com");

let c1 = {
	category: new Category(),
	images: []
};

let c2 = {
	category: new Category(),
	images: []
};


c1.category.title = "Logos";
c1.category.description = "Categoria con imagenes de logos";
c2.category.title = "Paisajes";

//addAuthor()
console.log("addAuthor()");
console.log(g1.addAuthor(a1));
console.log(g1.addAuthor(a3));
console.log(g1.addAuthor(a2));


let image1 = new Image("JavaScript-Logo", "https://s3-us-west-2.amazonaws.com/devcodepro/media/tutorials/funciones-en-javascript-t1.png");
let image2 = new Image("Python-Logo", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png");
let image3 = new Image("TypeScript-Logo", "https://res.cloudinary.com/practicaldev/image/fetch/s--LkL103Qa--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/377/landscape/typescriptlang.png");
let image4 = new Image("Playa", "https://blog.welcomebeds.com/wp-content/uploads/2018/12/playa-paraiso-mexico.jpg");
let image5 = new Image("Montaña", "https://www.ambientum.com/wp-content/uploads/2019/10/montanas-paisaje-naturaleza-696x464.jpg");
let image6 = new Landscape("Paisaje", "https://www.blogdelfotografo.com/wp-content/uploads/2020/04/fotografo-paisajes.jpg");
image6.setTitle = "Paisaje";
//Coords
image1.coords = new Coords("51° 30’ 30’’ N", "0° 7’ 32’’ O");
image2.coords = new Coords("19° 25’ 42’’ N", "99° 07’ 40’’ O");

console.log("Coords");
console.log(image1.coords.getLatitude);
console.log(image2.coords);

//addCategory()
console.log("addCategory()");
console.log(g1.addCategory(c1));
try {
	console.log(g1.addCategory(c2));
	console.log(g1.addCategory(null));
} catch (e) {
	console.log(e.toString());
}

//addImage()
console.log("addImage()");
console.log(g1.addImage(image1, c1, a1));
console.log(g1.addImage(image2, c1, a2));
console.log(g1.addImage(image3, c1, a3));
console.log(g1.addImage(image4, c2, a3));
console.log(g1.addImage(image5, c2, a2));
console.log(g1.addImage(image6, c2, a1));

//removeImage()
console.log("removeImage()");
console.log(g1.removeImage(image1));

//removeCategory()
console.log("removeCategory");
try {
	console.log(g1.removeCategory(c2));
} catch (e) {
	console.log(e.toString());
}
//getCategoryImages()
console.log("getCategoryImages()");
console.log(g1.getCategoryImages(c1));

//removeAuthor()
console.log("removeAuthor()");
console.log(g1.removeAuthor(a3));

//getAuthorImages()
console.log("getAuthorImages()");
console.log(g1.getAuthorImages(a1));

//Getter Categories
console.log("Getter Categories");
console.log(g1.categories);

//Getter Authors
console.log("Getter Authors");
console.log(g1.authors);

//getLandscapes()
console.log("getLandscapes()");
console.log(g1.getLandscapes());
