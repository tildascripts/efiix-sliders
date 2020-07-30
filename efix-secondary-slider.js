$(document).ready(() => {
    let currentSlide = 0;
	let mainWrapper= $("#rec213639919");
	mainWrapper.css("position", "relative");
	let childWrapper = $("<div id='childWrapper'></div>");
	childWrapper.css({
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		//zIndex: 10
	});
	mainWrapper.append(childWrapper);

	let buttons = [
		{
			text: $("[data-elem-id='1592819225098']"),
			block: $("[data-elem-id='1595478108089']"),
		},
		{
			text: $("[data-elem-id='1592819071206']"),
			block: $("[data-elem-id='1592818990462']"),
		},
		{
			text: $("[data-elem-id='1592819114916']"),
			block: $("[data-elem-id='1592819114911']"),
		},
		{
			text: $("[data-elem-id='1592819168807']"),
			block: $("[data-elem-id='1592819168801']"),
		},
	];

	let slides = [
		$("#rec213640511"),
		$("#rec213641598"),
		$("#rec213643730"),
		$("#rec213644186"),
	];


	buttons.forEach((button, index) => {
		let zIndexLvl = 100;
		button.block.css("z-index", zIndexLvl + index * 2);
		button.block.css("cursor", "pointer");
		button.text.css("z-index", zIndexLvl + index * 2 + 1);
		button.text.css("cursor", "pointer");

		button.block.on("click", () => openSlide(index))
		button.text.on("click", () => openSlide(index))

		if (index === 0) {
			button.block.fadeOut();
			button.text.find("div").css("color", "#494d57");
		}
		else {
			button.block.fadeIn();
			button.text.find("div").css("color", "#efeeee");
		}
	});

	slides.forEach((slide, index) => {
		childWrapper.append(slide);
		index !== 0 && slide.hide();
	});

	const openSlide = index => {
	    currentSlide = index;
		slides.forEach((slide, slideIndex) => {
			if (slideIndex === index) {
				slide.fadeIn();
			}
			else {
				slide.fadeOut();
			}
		});
		buttons.forEach((button, buttonIndex) => {
			if (buttonIndex === index) {
				button.block.fadeOut();
				button.text.find("div").css("color", "#494d57");
			}
			else {
				button.block.fadeIn();
				button.text.find("div").css("color", "#efeeee");
			}
		});
	}

	let handleButtons = {
	    next: document.querySelector("[data-elem-id='1596098511312']"),
	    prev: document.querySelector("[data-elem-id='1596098511319']")
	}
	handleButtons.next.style.zIndex = handleButtons.prev.style.zIndex = 101;
	handleButtons.next.style.cursor = handleButtons.prev.style.cursor = "pointer";
	handleButtons.next.addEventListener("click", () => {
	    currentSlide++;
	    if (currentSlide > slides.length - 1) {
	        currentSlide = 0;
	    }
	    openSlide(currentSlide);
	});
	handleButtons.prev.addEventListener("click", () => {
	    currentSlide--;
	    if (currentSlide < 0) {
	        currentSlide = slides.length - 1;
	    }
	    openSlide(currentSlide);
	});
});
