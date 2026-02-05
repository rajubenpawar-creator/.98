function compressImage(inputId, qualityId, linkId) {
  const input = document.getElementById(inputId);
  const quality = document.getElementById(qualityId).value / 100;
  const link = document.getElementById(linkId);

  if (!input.files.length) return alert("Select image");

  const img = new Image();
  const reader = new FileReader();

  reader.onload = e => img.src = e.target.result;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d").drawImage(img, 0, 0);

    canvas.toBlob(blob => {
      link.href = URL.createObjectURL(blob);
      link.download = "output.jpg";
      link.innerText = "Download Image";
      link.style.display = "block";
    }, "image/jpeg", quality);
  };

  reader.readAsDataURL(input.files[0]);
}
