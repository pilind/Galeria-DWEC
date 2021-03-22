"use strict";
let gallery = Gallery.getInstance();

gallery.title = "Galeria 1";
console.log(gallery.title);

let category1 = new Category('Promociones', 'https://via.placeholder.com/258x172.jpg?text=Promociones');
let category2 = new Category('Outlet', 'https://via.placeholder.com/258x172.jpg?text=Outlet');
let category3 = new Category('Ofertas especiales', 'https://via.placeholder.com/258x172.jpg?text=Ofertas+especiales');
let category4 = new Category('Reacondicionados', 'https://via.placeholder.com/258x172.jpg?text=Reacondicionados');
category1.description = 'Productos en promoción.';
category2.description = 'Outlet de productos con grandes descuentos.';
category3.description = 'Ofertas actuales.';
category4.description = 'Productos reacondicionados o seminuevos.';

console.log("Add Category");
console.log(gallery.addCategory(category1));
console.log(gallery.addCategory(category2));
console.log(gallery.addCategory(category3));
console.log(gallery.addCategory(category4));

let image1 = new Image('Promociones', 'https://via.placeholder.com/258x172.jpg?text=Promociones');
let image2 = new Image('Outlet', 'https://via.placeholder.com/258x172.jpg?text=Outlet');
let image3 = new Image('Ofertas especiales', 'https://via.placeholder.com/258x172.jpg?text=Ofertas+especiales');
let image4 = new Image('Reacondicionados', 'https://via.placeholder.com/258x172.jpg?text=Reacondicionados');
let image5 = new Portrait('Promociones2', 'https://via.placeholder.com/258x172.jpg?text=Promociones2');
let image6 = new Portrait('Outlet2', 'https://via.placeholder.com/258x172.jpg?text=Outlet2');
let image7 = new Landscape('Ofertas especiales 2', 'https://via.placeholder.com/258x172.jpg?text=Ofertas+especiales+2');
let image8 = new Landscape('Reacondicionados2', 'https://via.placeholder.com/258x172.jpg?text=Reacondicionados2');
let author1 = new Author('Pepito', 'pepito1@gallery.com');
let author2 = new Author('Manolito', 'manolito1@gallery.com');
let author3 = new Author('Antoñito', 'antoñito1@gallery.com');
let author4 = new Author('Miguelito', 'miguelito1@gallery.com');
let author5 = new Author('Ramon', 'ramoncito@gallery.com');

console.log("Add Author");
console.log(gallery.addAuthor(author1));
console.log(gallery.addAuthor(author2));
console.log(gallery.addAuthor(author3));
console.log(gallery.addAuthor(author4));
console.log(gallery.addAuthor(author5));

console.log("Add Image");
console.log(gallery.addImage(image1, category1, author1));
console.log(gallery.addImage(image2, category2, author2));
console.log(gallery.addImage(image3, category3, author3));
console.log(gallery.addImage(image4, category4, author4));
console.log(gallery.addImage(image5, category1, author4));
console.log(gallery.addImage(image6, category2, author3));
console.log(gallery.addImage(image7, category3, author1));
console.log(gallery.addImage(image8, category4, author2));

console.log("GetCategoryImages");
let c = gallery.getCategoryImages(category1);
let cs = c.next();

while (!cs.done) {
	console.log(cs);
	cs = c.next();
}

console.log("GetAuthorImages");
let ims = gallery.getAuthorImages(author1);
let im = ims.next();
while(!im.done){
	console.log(im.value);
	im = ims.next();
}


console.log("Getter Categories");
let cats = gallery.categories;
let cat = cats.next();

while (!cat.done) {
	console.log(cat);
	cat = cats.next();
}

console.log("Getter Authors");
let a = gallery.authors;
let as = a.next();
while (!as.done) {
	console.log(as);
	as = a.next();
}

console.log("getPortraits");
console.log(gallery.getPortraits());
console.log("getLandscapes");
console.log(gallery.getLandscapes());

console.log("removeAuthor");
console.log(gallery.removeAuthor(author3));

console.log("removeImage");
console.log(gallery.removeImage(image1));

let images = gallery.getTypeImages(Landscape, 'title');
let image = images.next();
while(!image.done){
	console.log(image.value);
	image = images.next();
}

console.dir(gallery);
