"use strict";

class Coords {
	#latitude
	#longitude

	constructor(latitude, longitude){
		this.#latitude = latitude;
		this.#longitude = longitude;
	}

	get latitude(){
		return this.#latitude;
	}

	set latitude(value){
		this.#latitude = value;
	}

	get longitude(){
		return this.#longitude;
	}

	set longitude(value){
		this.#longitude = value;
	}

}
