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
            stroke(100, 149, 227)
            strokeWeight(2)
            line(this.rays[i][0].x, this.rays[i][0].y, this.rays[i][1].x, this.rays[i][1].y)
        }
    }

    getReadings = function(ray, roadSegments){
        return
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