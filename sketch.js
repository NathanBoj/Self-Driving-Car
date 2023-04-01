let carimg

let carW
let carH

function preload(){
    carimg = loadImage('assets/car.png')
}

function saveCar(){
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain))
}

function discardCar(){
    localStorage.removeItem("bestBrain")
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
    checkpoints = new Checkpoint(checkpointLines)
    car = new Car(carimg, "AI")
    crossed = car.crossed
    bestCar = car
    
    if(localStorage.getItem("bestBrain")){
        bestCar.brain = JSON.parse(
            localStorage.getItem("bestBrain")
        )
    }

    saveBtn = createButton('Save')
    saveBtn.position(width/2, 100)
    saveBtn.mousePressed(saveCar)

    delBtn = createButton('Delete')
    delBtn.position(width/2, 150)
    delBtn.mousePressed(discardCar)
}

function draw(){
    // console.log(bestCar)
    
    background(34, 130, 21)

    car.update(road.roadSegments, checkpoints.chkPtSeg)

    // bestCar = Math.max(bestCar.crossed, car.crossed)
    // if(car.crossed > bestCar.crossed)

    bestCar = [car, bestCar].find(
        c=>c.crossed==Math.max(
            ...[car, bestCar].map(c=>c.crossed)
        )
    )
    

    road.show()

    // car.show()
    bestCar.show()

    checkpoints.show()
    

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

function mousePressed(){
    coordText = '{x:'+int(mouseX)+', y:'+int(mouseY)+"}"
    console.log(coordText)
    // [{x: 320, y: 50}, {x: 400, y: 190}]
}
