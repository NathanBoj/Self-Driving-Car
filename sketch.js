let carimg

let carW
let carH

function preload(){
    carimg = loadImage('assets/car.png')
}

function setup(){
    createCanvas(windowWidth*0.9, windowHeight*0.9).parent("gameCont")
    carW = 30
    carH = carW*carimg.height/carimg.width
    carimg.resize(carW, carH)

    const beginP1 = {x: 0, y: 0}
    const endP1 = {x: width, y: height}
    // console.log(carimg)
    road = new Road(roadLines)
    car = new Car(carimg)
}

function draw(){
    background(34, 130, 21)

    car.update(road.roadSegments)

    road.show()

    car.show()
    

    // stroke(0)
    // line(beginP1.x, beginP1.y, endP1.x, endP1.y)

    // image(carimg, width/10, height/2 - carH/2)
}

function keyPressed(){
    car.controls.keyDown(key)
}

function keyReleased(){
    car.controls.keyUp(key)
}