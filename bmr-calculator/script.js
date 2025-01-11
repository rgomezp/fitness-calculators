function toggleUnits() {
  const units = document.getElementById('units').value;
  const metricInputs = document.getElementById('metric-inputs');
  const imperialInputs = document.getElementById('imperial-inputs');

  if (units === 'metric') {
      metricInputs.style.display = 'block';
      imperialInputs.style.display = 'none';
  } else {
      metricInputs.style.display = 'none';
      imperialInputs.style.display = 'block';
  }
}

function updateActivityLabel(value) {
  const activityLabels = ['Sedentary', 'Light exercise', 'Moderate exercise', 'Intense exercise', 'Very intense exercise'];
  document.querySelector('.slider-label').innerText = activityLabels[value - 1];
}
document.addEventListener("DOMContentLoaded", () => {
          updateActivityLabel(document.getElementById("activity-level").value);
      });

function calculateBMR() {
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const units = document.getElementById('units').value;

  let height, weight;

  if (units === 'metric') {
      height = document.getElementById('height').value;
      weight = document.getElementById('weight').value;
  } else {
      const heightFeet = parseFloat(document.getElementById('height-feet').value || 0);
      const heightInches = parseFloat(document.getElementById('height-inches').value || 0);
      height = (heightFeet * 30.48) + (heightInches * 2.54); // Convert to cm
      weight = parseFloat(document.getElementById('weight-lbs').value) * 0.453592; // Convert to kg
  }

  const activityLevel = document.getElementById('activity-level').value;

  if (!age || !height || !weight) {
      document.getElementById('result').innerText = 'Please fill out all fields.';
      return;
  }

  let bmr;
  if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityMultiplier = {
      '1': 1.2, // Sedentary
      '2': 1.375, // Light exercise
      '3': 1.55, // Moderate exercise
      '4': 1.725, // Intense exercise
      '5': 1.9 // Very intense exercise
  }[activityLevel];

  const calorieNeeds = (bmr * activityMultiplier).toFixed(0);

  document.getElementById('result').innerHTML = `Your BMR is <strong>${bmr.toFixed(0)} Calories/day</strong>.<br>Daily calorie needs: <strong>${calorieNeeds} Calories/day</strong>`;

  updateActivityLabel(activityLevel);
}
