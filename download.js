// Page setup
const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Rather than calling the function direction, inject it with
  // the chrome api
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: downloadBlob,
  });
});

function downloadBlob() {
  // Returns 0 if number is bad
  function fixRawNumber(rawNumber) {
    const parsed = Number.parseInt(rawNumber, 10);
    return parsed !== NaN ? parsed : 0;
  }

  function prettyPrint(anyValue) {
    console.log(JSON.stringify(anyValue, null, 2));
  }

  function convertObjectArrayToCSV(objectArray) {
    // Get the header array (assumes first object has fields)
    const FIRST_ELEMENT = 0;
    const header = Object.keys(objectArray[FIRST_ELEMENT]);

    // Returns: string[], each element is a row of data
    const data = objectArray.map((row) => {
      // Use the value of each header field to build an array
      const rowValueArray = header.map((field) => {
        // Return the stringified field (adds quotes)
        return JSON.stringify(row[field]);
      });

      // Then join it together to create the CSV row of values
      return rowValueArray.join(",");
    });

    // data is already a string[], just shove the header string in front
    data.unshift(header.join(","));
    const csv = data.join("\r\n");
    return csv;
  }

  // https://www.pokellector.com/sets/N1-Neo-Genesis?list_display=list
  // 1. Open a set, and change to the checklist view on PC
  // 2. Open a javascript console and page all these functions into it
  // 3. run scrapePokellectorList(true) to get JSON
  // 4. run convertObjectArrayToCSV(scrapePokellectorList()) to get CSV
  function scrapePokellectorList(printJson) {
    const cardList = [];
    const allPokemon = document.querySelectorAll("div.checklisttable ol li");

    // Data we can get from the site
    // setNumber, name, rarity
    allPokemon.forEach((pokemon) => {
      const rarity = pokemon?.getAttribute("class")?.trim() || "";
      const rawNumber = pokemon.querySelector("span.number")?.innerText || 0;
      const setNumber = fixRawNumber(rawNumber);
      const name = pokemon.querySelector("span.name")?.innerText || "";

      cardList.push({
        setNumber,
        name,
        rarity,
      });
    });

    if (printJson) {
      prettyPrint(cardList);
    }

    return cardList;
  }

  const csv = convertObjectArrayToCSV(scrapePokellectorList(false));

  // Create the file and trigger download:
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pokemon.csv";

  // Trigger the download
  a.click();
}
