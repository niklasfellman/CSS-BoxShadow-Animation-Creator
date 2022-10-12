let root = document.documentElement;
let domBoard = document.querySelector(".board")
let hueSlider = document.getElementById("hue")
let saturationSlider = document.getElementById("saturation")
let lightnessSlider = document.getElementById("lightness")
let alphaSlider = document.getElementById("alpha")
let brushSizeSlider = document.getElementById("size")


let boardWidth = domBoard.clientWidth
let cellSize = brushSizeSlider.value
let currentColor = `hsla(${hueSlider.value},${saturationSlider.value}%,${lightnessSlider.value}%,${alphaSlider.value/100})`
let boxShadowArr = []
root.style.setProperty("--box-shadow-variable", boxShadowArr.join(","))


root.style.setProperty("--current-color", currentColor)

function updateCurrentColor(hue,saturation,lightness,alpha = 1){
	return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`
}
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
// = = = = = > Using unshift here to be able to draw infront of already colored cells, should fix < = = = = 
	boxShadowArr.unshift(createBoxShadowStr(cordinates.x,cordinates.y,cellSize,currentColor))		
	//boxShadowArr.unshift(createBoxShadowStr(cordinates.x,cordinates.y,cellSize,currentColor))		
	updateDomBoard(boxShadowArr.join(","))
})


domBoard.addEventListener("contextmenu",(x)=>{
	x.preventDefault();
	console.log(x)
	let cordinates = {
		"x" : Math.floor(x.offsetX/cellSize) * cellSize + cellSize/2,
		"y" : Math.floor(x.offsetY/cellSize) * cellSize + cellSize/2
	}	
	boxShadowArr.unshift(createBoxShadowStr(cordinates.x,cordinates.y,cellSize,"#fff"))		
	updateDomBoard(boxShadowArr.join(","))
})



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
