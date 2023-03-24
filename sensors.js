class Sensor{

    constructor(car){
        this.car = car
        this.numRays = 5
        this.rayLength = 130
        this.raySpread = Math.PI / 3

        this.rays = []

        this.readings = []
    }

    update = function(roadSegments){
        this.castRays()

        this.readings = []

        for(let i = 0; i < this.rays.length; i++){
            this.readings.push(
                this.getReadings(this.rays[i], roadSegments)
            )
        }
        
    }

    show = function(){
        for(let i = 0; i < this.numRays; i++){
            let end = this.rays[i][1]
            if(this.readings[i]){
                end = this.readings[i]
            }

            stroke(100, 149, 227)
            strokeWeight(2)
            // line(this.rays[i][0].x, this.rays[i][0].y, end.x, end.y)
            // stroke(214, 96, 114)
            // line(this.rays[i][1].x, this.rays[i][1].y, end.x, end.y)

            beginShape()
            vertex(this.rays[i][0].x, this.rays[i][0].y)
            vertex(end.x, end.y)
            endShape()

            stroke(214, 96, 114)
            beginShape()
            vertex(end.x, end.y)
            vertex(this.rays[i][1].x, this.rays[i][1].y)
            endShape()

            console.log(i + ' ' + (end.x-this.rays[i][1].x) + ', ' + (end.y - this.rays[i][1].y))
        }
    }

    getReadings = function(ray, roadSegments){
        
        let touches = []

        for(let i=0; i < roadSegments.length; i++){
            const touch = getIntersect(
                ray[0],
                ray[1],
                roadSegments[i][0],
                roadSegments[i][1]
            )

            if (touch){
                touches.push(touch)
            }
        }

        if(touches.length == 0){
            return null
        }else{
            const offsets = touches.map(e => e.offset)
            const minOffset = Math.min(...offsets)
            return touches.find(e=>e.offset == minOffset)
        }
    }

    castRays = function(){
        this.rays = []
        for(let i = 0; i < this.numRays; i++){

            const rayAngle = linInt(
                this.raySpread/2,
                -this.raySpread/2,
                this.numRays == 1 ? 0.5 : i/(this.numRays-1)
            )+this.car.angle

            const start = {x: this.car.centerX, y: this.car.centerY}
            const end = {
                x: this.car.centerX - Math.sin(rayAngle)*this.rayLength,
                y: this.car.centerY - Math.cos(rayAngle)*this.rayLength
            }

            this.rays.push([start, end])

        }
    }   

}