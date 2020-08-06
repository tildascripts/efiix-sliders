$(document).ready(() => {
    let slidesID = [
        "rec206653934",
        "rec209578767",
        "rec211167495",
        "rec211169276",
        "rec211169807",
        "rec211170579",
        "rec211171856",
        "rec211174267",
    ];
    let showOnly = 3;
    
    class Slider {
    	constructor({
    		container,
    		slides,
    		diagonalSize = 40,
    		autoSlideInterval = 2000,
    		startFrom = 0,
    	}) {
    		this.container = container;
    		this.slides = slides;
    		this.diagonalSize = diagonalSize;
    		this.autoSlideInterval = autoSlideInterval;
    		this.currentSlide = startFrom;
    		this.prevSlide = startFrom;
    		this.animating = false;
    		this.justInit = true;
    		this.baseZIndex = 40;
    		
    		this.onResize = () => {
    		    if (window.innerWidth < 480 && this.diagonalSize !== 18) {
    		        this.diagonalSize = 18;
    		        this.animate();
    		    }
    		    else if (window.innerWidth >= 480 && this.diagonalSize !== 40) {
    		        this.diagonalSize = 40;
    		        this.animate();
    		    }
    		}
    		window.addEventListener("resize", this.onResize);
    	}
    
    	getDirection(currentSlide, prevSlide) {
    		if (
    			(currentSlide > prevSlide && !(prevSlide === 0 && currentSlide === this.slides.length - 1)) ||
    			(currentSlide === 0 && prevSlide === this.slides.length - 1) ||
    			currentSlide === prevSlide
    		) {
    			return "forward";
    		}
    		else {
    			return "backward";
    		}
    	}
    
    	getTranslate(index) {
    		let offset = this.diagonalSize / (showOnly - 1);
    
    		return offset * index;
    	}
    
    	getSlide(child) {
    		let slide = document.createElement("div");
    		//slide.classList.add("slider-slide");
    
    		slide.style.position =  "absolute";
    		slide.style.width =  "100%";
    		//slide.style.height =  "100%";
    		//slide.style.boxShadow =  "0 5px 20px 13px rgba(0, 0, 0, 0.06)";
    		slide.style.top =  "0";
    		slide.style.left = `${-this.diagonalSize / 2}px`;
    		slide.style.transition =  "all .2s ease-in-out";
    		slide.style.height = `calc(100% - ${this.diagonalSize}px)`;
    		slide.appendChild(child);
    		return slide;
    	}
    
    	getCurrentOrder() {
    		return this.slides.slice(this.currentSlide).concat(this.slides.slice(0, this.currentSlide));
    	}
    
    	animate() {
    		this.animating = true;
    		this.getCurrentOrder().forEach((item, index) => {
    			let offset = this.getTranslate(index);
    			let direction = this.getDirection(this.currentSlide, this.prevSlide);
    			
    			item.style.left = `${-this.diagonalSize / 2}px`;
    			if (index === this.slides.length - 1 && !this.justInit && direction === "forward") {
    				item.style.opacity = 0;
    				item.style.transform = `translate(${-this.diagonalSize / 2}px, ${-this.diagonalSize / 2}px)`;
    				item.style.zIndex = this.baseZIndex + 99;
    				
    				setTimeout(() => {
    				    item.style.zIndex = 1
    				}, 200)
    			}
    			else if (index === 0 && !this.justInit && direction === "backward") {
    				item.style.opacity = 0;
    				item.style.transform = `translate(${this.diagonalSize + (this.diagonalSize / 2)}px, ${this.diagonalSize + (this.diagonalSize / 2)}px)`;
    
    				setTimeout(() => {
    					item.style.transition = "none";
    					item.style.zIndex = this.baseZIndex + 99;
    					item.style.transform = `translate(${-this.diagonalSize / 2}px, ${-this.diagonalSize / 2}px)`;
    					setTimeout(() => {
    						item.style.transform = `translate(${offset}px, ${offset}px)`;
    						item.style.zIndex = this.baseZIndex + this.slides.length - index - 1;
    						item.style.transition = "all .2s ease-in-out";
    						item.style.opacity = 1;
    					}, 50);
    				}, 200);
    			}
    			else if (index >= 0 && index < showOnly) {
    				item.style.transform = `translate(${offset}px, ${offset}px)`;
    				item.style.zIndex = this.baseZIndex + this.slides.length - index - 1;
    				item.style.opacity = 1;
    			}
    			else  {
    				item.style.transform = `translate(${offset}px, ${offset}px)`;
    				item.style.zIndex = this.baseZIndex + this.slides.length - index - 1;
    				item.style.opacity = 0;
    				
    				setTimeout(() => {
    				    item.style.zIndex = 1
    				}, 200)
    			}
    		});
    		setTimeout(() => {
    			this.animating = false;
    			this.justInit = false;
    		}, 400);
    	}
    
    	slideForward() {
    		if (!this.animating) {
    			this.prevSlide = this.currentSlide;
    			this.currentSlide++;
    			if (this.currentSlide > this.slides.length - 1) {
    				this.currentSlide = 0;
    			}
    			this.animate();
    		}
    	}
    
    	slideBackward() {
    		if (!this.animating) {
    			this.prevSlide = this.currentSlide;
    			this.currentSlide--;
    			if (this.currentSlide < 0) {
    				this.currentSlide = this.slides.length - 1;
    			}
    			this.animate();
    		}
    	}
    
    	init() {
    		this.slides = this.slides.map(this.getSlide.bind(this));
    
    		this.container.style.position = "relative";
    
    		this.getCurrentOrder().forEach((item, index) => {
    			//this.container.querySelector("#slider-slides").appendChild(item);
    			this.container.appendChild(item);
    		});
    
    		let buttons = {
    			left: this.container.querySelector("[data-elem-id='1593069424692']"),
    			right: this.container.querySelector("[data-elem-id='1593069275334']")
    		}
    		buttons.left.addEventListener("click", e => slider.slideBackward());
    		buttons.right.addEventListener("click", e => slider.slideForward());
    
    		buttons.left.style.zIndex = 999;
    		buttons.right.style.zIndex = 999;
    
    		this.animate();
    		this.onResize();
    	}
    }
    
    let slider = new Slider({
    	container: document.getElementById("rec206653560"),//document.getElementById("slider-container"),
    	slides: slidesID.map(item => document.getElementById(item))
    });
    
    slider.init();
    
    let disableBGstyle = document.createElement("style");
    disableBGstyle.innerHTML = "#rec206653560 .t396__artboard {background-color: transparent!important;}";
    document.head.appendChild(disableBGstyle);
});
