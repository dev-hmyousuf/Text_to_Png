const textarea = document.querySelector("textarea"),
  fileNameInput = document.querySelector(".file-name input"),
  selectMenu = document.querySelector(".save-as select"),
  saveBtn = document.querySelector(".save-btn"),
  titleInput = document.querySelector("#title");

// Event listener for select menu change
selectMenu.addEventListener("change", () => {
  const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;
  console.log("Selected Format:", selectedFormat); // Check console output
  saveBtn.innerText = `Save As ${selectedFormat.split(" ")[0]} File`;
});

saveBtn.addEventListener("click", () => {
  const selectedFormat = selectMenu.value;
  const fileName = fileNameInput.value;

  if (selectedFormat === "image/png") {
    saveAsPNG(fileName);
  } else {
    saveAsTextOrOther(fileName, selectedFormat);
  }
});

function saveAsTextOrOther(fileName, format) {
  const blob = new Blob([textarea.value], { type: format });
  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName || "file";
  link.href = fileUrl;
  link.click();
}

function saveAsPNG(fileName) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Get user settings
  const width = parseInt(document.getElementById("pngWidth").value) || 500;
  const padding = parseInt(document.getElementById("padding").value) || 10;
  const textColor = document.getElementById("textColor").value || "#000";
  const backgroundColor = document.getElementById("backgroundColor").value || "#fff";
  const textShadow = document.getElementById("textShadow").value || "none";
  const alignHorizontal = document.getElementById("alignHorizontal").value || "left";
  const alignVertical = document.getElementById("alignVertical").value || "top";

  canvas.width = width;

  // Set background color
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set title settings
  ctx.fillStyle = textColor;
  ctx.font = "bold 24px Poppins";
  ctx.textAlign = alignHorizontal;

  // Apply text shadow if specified
  if (textShadow !== "none") {
    const [xOffset, yOffset, blur, color] = textShadow.split(" ");
    ctx.shadowOffsetX = parseInt(xOffset);
    ctx.shadowOffsetY = parseInt(yOffset);
    ctx.shadowBlur = parseInt(blur);
    ctx.shadowColor = color;
  } else {
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
  }

  // Calculate title position
  let titleX = padding;
  let titleY = padding + 24; // Title height

  if (alignHorizontal === "center") {
    titleX = canvas.width / 2;
  } else if (alignHorizontal === "right") {
    titleX = canvas.width - padding;
  }

  // Draw the title
  ctx.fillText(titleInput.value, titleX, titleY);

  // Function to wrap text and calculate height
  function wrapText(ctx, text, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let y = titleY + padding;
    const lines = [];
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    y += lineHeight;
    return { lines, height: y };
  }

  const lineHeight = 20;
  const { lines, height } = wrapText(ctx, textarea.value, canvas.width - padding * 2, lineHeight);

  // Adjust canvas height based on text height
  canvas.height = height + padding * 2 + 24; // Added 24px for title height

  // Redraw background color
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Redraw title
  ctx.fillStyle = textColor;
  ctx.font = "bold 24px Poppins";
  ctx.textAlign = alignHorizontal;

  if (textShadow !== "none") {
    const [xOffset, yOffset, blur, color] = textShadow.split(" ");
    ctx.shadowOffsetX = parseInt(xOffset);
    ctx.shadowOffsetY = parseInt(yOffset);
    ctx.shadowBlur = parseInt(blur);
    ctx.shadowColor = color;
  } else {
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
  }

  ctx.fillText(titleInput.value, titleX, titleY);

  // Calculate the start position for text
  let x = padding;
  let y = titleY + 24 + padding; // Added title height and padding

  if (alignHorizontal === "center") {
    x = canvas.width / 2;
  } else if (alignHorizontal === "right") {
    x = canvas.width - padding;
  }

  if (alignVertical === "middle") {
    y = (canvas.height - height) / 2;
  } else if (alignVertical === "bottom") {
    y = canvas.height - height - padding;
  }

  // Draw the text
  ctx.font = "16px Poppins"; // Set font for text
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });

  // Save as PNG
  const link = document.createElement("a");
  link.download = fileName || "file.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}


var myName = "Yousuf";
function sayname(){
  console.log(this.myName);
}
sayname()