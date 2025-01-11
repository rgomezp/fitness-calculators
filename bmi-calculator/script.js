// Initialize the slider position
function initializeSlider() {
  const slider = document.getElementById("bmi-slider");
  slider.style.left = "0px"; // Start at the leftmost position
}

// Call initializeSlider on page load
window.onload = initializeSlider;

function toggleUnitFields() {
  const units = document.getElementById("units").value;
  const imperialInputs = document.getElementById("imperial-inputs");
  const metricInputs = document.getElementById("metric-inputs");

  if (units === "metric") {
      metricInputs.style.display = "block";
      imperialInputs.style.display = "none";
  } else {
      metricInputs.style.display = "none";
      imperialInputs.style.display = "block";
  }
}

function calculateBMI() {
  const units = document.getElementById("units").value;
  let height, weight;

  if (units === "metric") {
      height = parseFloat(document.getElementById("height-cm").value) / 100; // Convert cm to meters
      weight = parseFloat(document.getElementById("weight-kg").value);
  } else {
      const heightFeet = parseFloat(document.getElementById("height-feet").value) || 0;
      const heightInches = parseFloat(document.getElementById("height-inches").value) || 0;
      height = ((heightFeet * 12) + heightInches) * 0.0254; // Convert total height to meters
      weight = parseFloat(document.getElementById("weight-lbs").value) * 0.453592; // Convert lbs to kg
  }

  if (!height || !weight) {
      document.getElementById("result").innerText = "Please fill out all fields.";
      return;
  }

  // Calculate BMI
  const bmi = (weight / (height ** 2)).toFixed(1);

  // Update result text
  let category;
  if (bmi < 16) {
      category = "Severely Underweight";
  } else if (bmi < 18.5) {
      category = "Underweight";
  } else if (bmi < 25) {
      category = "Normal";
  } else if (bmi < 30) {
      category = "Overweight";
  } else {
      category = "Obese";
  }
  document.getElementById("result").innerText = `BMI = ${bmi} (${category})`;

  // Animate slider position
  const slider = document.getElementById("bmi-slider");
  const thermometerWidth = document.querySelector(".thermometer").offsetWidth;
  const sliderPosition = mapBMIToPosition(bmi, thermometerWidth);
  slider.style.left = `${sliderPosition}px`;
}

// Map BMI value to slider position in pixels
function mapBMIToPosition(bmi, width) {
  if (bmi < 16) return 0; // Start of the bar
  if (bmi > 40) return width - 6; // End of the bar

  // Proportional mapping based on BMI ranges
  const ranges = [
      { min: 0, max: 16, start: 0, end: (16 / 40) * width },
      { min: 16, max: 18.5, start: (16 / 40) * width, end: (18.5 / 40) * width },
      { min: 18.5, max: 25, start: (18.5 / 40) * width, end: (25 / 40) * width },
      { min: 25, max: 30, start: (25 / 40) * width, end: (30 / 40) * width },
      { min: 30, max: 40, start: (30 / 40) * width, end: width }
  ];

  // Find the range and calculate position
  for (const range of ranges) {
      if (bmi >= range.min && bmi <= range.max) {
          const ratio = (bmi - range.min) / (range.max - range.min);
          return range.start + ratio * (range.end - range.start);
      }
  }

  return 0;
}
