'use strict';
document
  .getElementById('colorInput')
  .addEventListener('input', function (event) {
    //get the selected color from input(not colorInput, input is standard for color)
    let selectedColor = event.target.value;
    //update the color text
    document.getElementById('colorCode').textContent = selectedColor;
    //update the background color of the display box.
    document.getElementById('colorDisplay').style.backgroundColor =
      selectedColor;
  });
