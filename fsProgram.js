const fs = require("fs");

const emojis = ["😀", "😂", "😍", "🤔", "😎", "😭", "🥳", "🔥", "🚀"];


fs.readFile("source.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  console.log("Source file content:", data);


    const columns = parseInt(data.split("X")[0]);
 
  const array = data.split("_")[1];
    console.log("Array:", array);
  

  console.log("colums:", columns);
  fs.writeFileSync("emojis.txt", "", "utf8");




  for (let i = 0; i < array.length; i++) {
    const index = parseInt(array[i]-1); 
    console.log("Index:", index);

    if(index < 0 || index >= emojis.length) {
      console.error("Index out of bounds:", index);
      continue; 
    }
    console.log("Emoji to append:", emojis[index]); 
   fs.appendFileSync("emojis.txt", emojis[index] + ((index + 1) % columns === 0 ? "\n" : " "), "utf8");
  }

 
});