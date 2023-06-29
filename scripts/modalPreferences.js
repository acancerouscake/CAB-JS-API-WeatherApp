// Clothing preferences
const preferences = {
	cold: [],
	normal: [],
	hot: [],
};

const cold = ["Jacket", "Gloves", "Hoodie", "Beanie", "Leggings", "Jeans"];
const normal = ["T-Shirt", "Dress", "Jeans", "Shirt", "Cardigan", "Pullover"];
const hot = [
	"Shorts",
	"Tank Top",
	"T-Shirt",
	"Skirt",
	"Dress",
	"Cap",
	"Short Sleeved Shirt",
];

const clothingImages = {
	Jacket: "../assets/clothing-icons/Jacket.png",
	Gloves: "../assets/clothing-icons/Gloves.png",
	Hoodie: "../assets/clothing-icons/Hoodie.png",
	Beanie: "../assets/clothing-icons/Beanie.png",
	Leggings: "../assets/clothing-icons/Leggings.png",
	Jeans: "../assets/clothing-icons/Jeans.png",
	TShirt: "../assets/clothing-icons/T-shirt.png",
	Dress: "../assets/clothing-icons/Dress.png",
	Shirt: "../assets/clothing-icons/Shirt.png",
	Cardigan: "../assets/clothing-icons/Cardigan.png",
	Pullover: "../assets/clothing-icons/Pullover.png",
	Shorts: "../assets/clothing-icons/Shorts.png",
	TankTop: "../assets/clothing-icons/Tank-Top.png",
	Skirt: "../assets/clothing-icons/Skirt.png",
	ShortSleevedShirt: "../assets/clothing-icons/Short-Sleeved-Shirt.png",
	Cap: "../assets/clothing-icons/Cap.png",
};

const createCheckboxes = (temperature, items) => {
	const formContainer = document.createElement("div");
	const heading = document.createElement("h4");
	heading.textContent = `${temperature}`;
	formContainer.appendChild(heading);

	items.forEach((item) => {
		const label = document.createElement("label");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = temperature.toLowerCase();
		checkbox.value = item;
		label.appendChild(checkbox);
		label.appendChild(document.createTextNode(item));
		formContainer.appendChild(label);
	});
	return formContainer;
};

const buildModal = () => {
	const modalContent = document.getElementById("modal-content");
	const container = document.getElementById("checkbox-container");

	// Create checkboxes for each temperature array
	const coldCheckboxes = createCheckboxes("Cold", cold);
	const normalCheckboxes = createCheckboxes("Normal", normal);
	const hotCheckboxes = createCheckboxes("Hot", hot);
	container.appendChild(coldCheckboxes);
	container.appendChild(normalCheckboxes);
	container.appendChild(hotCheckboxes);

	modalContent.appendChild(container);
};

const modalOverlay = document.getElementById("modal-overlay");

const addEventListeners = () => {
	//Open preferences selection on icon cliclk
	document
		.getElementById("clothing-preferences-icon")
		.addEventListener("click", showModalWindow);

	//Close button
	document
		.getElementById("close-modal")
		.addEventListener("click", () => modalOverlay.classList.remove("open"));

	const savedPreferences = sessionStorage.getItem("clothingPreferences");
	if (savedPreferences) {
		let preferences = JSON.parse(savedPreferences);
		try {
			preferences = JSON.parse(savedPreferences);
		} catch (error) {
			console.error("Error parsing clothing preferences:", error);
			return;
		}

		// Iterate through each temperature bracket and set checkbox values
		for (const temperature in preferences) {
			preferences[temperature].forEach((item) => {
				const checkbox = document.querySelector(
					`input[name="${temperature}"][value="${item}"]`
				);
				if (checkbox) {
					checkbox.checked = true;
				}
			});
		}
	}

	// Save the preferences to sessionStorage when the save button is clicked
	document.getElementById("saveBtn").addEventListener("click", () => {
		// Iterate through each temperature bracket and extract selected values
		for (const temperature in preferences) {
			const checkboxes = document.querySelectorAll(
				`input[name="${temperature}"]:checked`
			);
			preferences[temperature] = Array.from(checkboxes).map(
				(checkbox) => checkbox.value
			);
		}

		// Store preferences in sessionStorage
		sessionStorage.setItem("clothingPreferences", JSON.stringify(preferences));

		// Close
		modalOverlay.classList.remove("open");
		if (document.title === "Result") {
			location.reload();
		}
	});

	console.log(sessionStorage.getItem("clothingPreferences"));
};

const showModalWindow = () => {
	modalOverlay.classList.add("open");
};

buildModal();
addEventListeners();
