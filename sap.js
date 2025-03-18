// hello

//grabs all selected checkboxes
function genBatchFile()
{
  let selectedCheckBoxes = document.querySelectorAll("input[name='apps']:checked")

  if (selectedCheckBoxes.length === 0)
  {
    return;
  }

  //creates winget install commands
  let installCommands = [];
  selectedCheckBoxes.forEach(checkbox => {
    installCommands.push(`winget install --id=${checkbox.value} --silent --accept-source-agreements --accept-package-agreements`);
  })

  //creates batch script content
  let batchScript =`
  @echo off
  echo Installing applications...
  ${installCommands.join("\n")}
  echo install complete.
  exit
  `;


  //downloadable file
  let userFile = new Blob([batchScript], { type: "text/plain" });
  let downloadLink = document.createElement("a");

  downloadLink.href = URL.createObjectURL(userFile);
  downloadLink.download = "Folium.bat";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);//deletes temporary info
}

