let root = document.documentElement;
let domBoard = document.querySelector(".board")
let hueSlider = document.getElementById("hue")
let saturationSlider = document.getElementById("saturation")
let lightnessSlider = document.getElementById("lightness")
let alphaSlider = document.getElementById("alpha")
let brushSizeSlider = document.getElementById("size")
let theElement = document.querySelector(".the-shadow")
let styles = document.styleSheets[0].cssRules
let animationPreview = document.getElementById("animation-preview")

let boardWidth = domBoard.clientWidth
let cellSize = brushSizeSlider.value
let currentColor = `hsla(${hueSlider.value},${saturationSlider.value}%,${lightnessSlider.value}%,${alphaSlider.value/100})`
let boxShadowArr = []
let cellsUsed = {}

root.style.setProperty("--box-shadow-variable", boxShadowArr.join(","))
root.style.setProperty("--current-color", currentColor)

function updateDomBoard(str){
root.style.setProperty("--box-shadow-variable", str)
}
function createBoxShadowStr(x,y,size,color = "orange"){
return `${x}px ${y}px 0 ${size/2}px ${color}`
}

domBoard.addEventListener("click",(x)=>{
	let cordinates = {
		"x" : Math.floor(x.offsetX/cellSize) * cellSize + cellSize/2,
		"y" : Math.floor(x.offsetY/cellSize) * cellSize + cellSize/2
	}	
	cellsUsed[`${cordinates.x}-${cordinates.y}`] = createBoxShadowStr(cordinates.x,cordinates.y,cellSize,currentColor)
	for(let x in cellsUsed){
		boxShadowArr.push(cellsUsed[x])
	}
	updateDomBoard(boxShadowArr.join(","))
	boxShadowArr = []
})


domBoard.addEventListener("contextmenu",(x)=>{
	x.preventDefault();
	let cordinates = {
		"x" : Math.floor(x.offsetX/cellSize) * cellSize + cellSize/2,
		"y" : Math.floor(x.offsetY/cellSize) * cellSize + cellSize/2
	}	
	cellsUsed[`${cordinates.x}-${cordinates.y}`] = createBoxShadowStr(cordinates.x,cordinates.y,cellSize,"white")
	for(let x in cellsUsed){
		boxShadowArr.push(cellsUsed[x])
	}
	updateDomBoard(boxShadowArr.join(","))
	boxShadowArr = []
})


function updateCurrentColor(hue,saturation,lightness,alpha = 1){
	return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`
}

hueSlider.addEventListener("input",(x)=>{
	currentColor = updateCurrentColor(hueSlider.value,saturationSlider.value,lightnessSlider.value, alphaSlider.value/100) 
	root.style.setProperty("--current-color", currentColor)
})
saturationSlider.addEventListener("input",(x)=>{
	currentColor = updateCurrentColor(hueSlider.value,saturationSlider.value,lightnessSlider.value, alphaSlider.value/100) 
	root.style.setProperty("--current-color", currentColor)
})
lightnessSlider.addEventListener("input",(x)=>{
	currentColor = updateCurrentColor(hueSlider.value,saturationSlider.value,lightnessSlider.value, alphaSlider.value/100) 
	root.style.setProperty("--current-color", currentColor)
})

alphaSlider.addEventListener("input",(x)=>{
	currentColor = updateCurrentColor(hueSlider.value,saturationSlider.value,lightnessSlider.value,alphaSlider.value/100) 
	root.style.setProperty("--current-color", currentColor)
})
brushSizeSlider.addEventListener("input",(x)=>{
	cellSize = x.target.value	
})

let dynamicStyles = null;

function addAnimation(body) {
  if (!dynamicStyles) {
    dynamicStyles = document.createElement('style');
    dynamicStyles.type = 'text/css';
    document.head.appendChild(dynamicStyles);
  }
  dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
}

addAnimation(` @keyframes boxShadowAnimation { `);

animationPreview.style.animationName = "boxShadowAnimation"
console.dir(dynamicStyles)

function createKeyFrames(frames){
	let length = frames.length
	let strArr = [`0%{box-shadow:${frames[0]}}`]
	console.log(strArr)
	let result = `@keyframes boxShadowAnimation {`
	result += strArr[0]
	if(length < 2){
		strArr.push(`100%{box-shadow:${frames[0]}}}`)
		for(let i = 1;i<frames.length;i++){
			result += frames[i]
		}	
		return result
	}
	let increment = Math.floor(100/length)
	let currentNum = increment
	console.log(increment)
	for(let i = 1;i<frames.length;i++){
		result += `${currentNum}%{box-shadow:${frames[i]}}`
		currentNum += increment	
	}
	result += `100%{box-shadow:${frames[0]}}}`
	return result
}

let framesArr = []
function addFrame(){
	for(let x in cellsUsed){
		boxShadowArr.push(cellsUsed[x])
	}
	framesArr.push(boxShadowArr.join(","))
	boxShadowArr = []
	console.log(framesArr)
	dynamicStyles.sheet.deleteRule(0)
addAnimation(createKeyFrames(framesArr))
}
