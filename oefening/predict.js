import { createChart, updateChart } from "./scatterplot.js"

let nn

async function loadModel() {
  nn = await ml5.neuralNetwork('./model/model.json')
  makePrediction()
}

async function makePrediction() {
  let ppi = parseFloat(document.getElementById("ppi").value)
  let cores = parseInt(document.getElementById("cores").value)
  let memory = parseInt(document.getElementById("memory").value)
  let storage = parseInt(document.getElementById("storage").value)
  let rearcam = parseFloat(document.getElementById("rearcam").value)
  let frontcam = parseFloat(document.getElementById("frontcam").value)
  let battery = parseInt(document.getElementById("battery").value)
  let thickness = parseFloat(document.getElementById("thickness").value)
  let resolution = parseFloat(document.getElementById("resolution").value)

  let result = await nn.predict({ 
    ppi: ppi,
    cores: cores,
    memory: memory, 
    storage: storage,
    rearcam: rearcam,
    frontcam: frontcam,
    battery: battery,
    thickness: thickness,
    resolution: resolution
  })

  console.log(result[0].price)

  // update chart with prediction
  updateChart([{ x: battery, y: result[0].price }])
}

loadModel()
