class Car{
    
    constructor(img, controlType){
        this.img = img;
        this.w = this.img.width
        this.h = this.img.height
        this.x = width/10
        this.y = height - this.h - 200

        this.centerX = this.x + this.w/2
        this.centerY = this.y + this.h/2

        this.sensor = new Sensor(this)
        this.brain = new NeuralNetwork(
            [this.sensor.numRays, 6, 4]
        )
        this.controls = new Controls(controlType)

        this.useBrain=controlType == 'AI'

        this.speed = 0
        this.acc = 0.2
        this.maxSpeed = 3
        this.friction = 0.07

        this.crashed = false

        this.crossed = 0
        this.onChkpt = false

        this.angle = 0
        this.turnRad = 0.03 //greater number means tighter turns
    }

    show = function(){
        fill(0, 0, 0, 0)
        // noStroke()
        stroke('yellow')
        push()
        translate(this.x+this.w/2, this.y+this.h/2)
        rotate(-this.angle)

        if(this.crashed){
            tint(0, 255, 0)
            image(this.img, 0-this.w/2, 0-this.h/2)
        }else{
            image(this.img, 0-this.w/2, 0-this.h/2)
        }

        // boundX = 0-this.w/2
        // boundY = 0-this.h/2
        
        // rect(0-this.w/2, 0-this.h/2, this.w, this.h) // Bounding Rectangle --> later replaced with points (this is just here for debugging)

        // fill(0,0,0)
        // circle(this.x+this.w/2, this.y+this.h/2, 50)
        
        
        pop()

        this.sensor.show()

        // stroke(0)
        // line(this.centerX, 0, this.centerX, height)
        // line(0, this.centerY, width, this.centerY)
    }

    update = function(roadSegments, checkpoints){
        if(!this.crashed){
            this.move()

            this.sensor.update(roadSegments)
            const offsets = this.sensor.readings.map(
                s=>s==null?0:1-s.offset
            )
            const outputs = NeuralNetwork.feedForward(offsets, this.brain)
            // console.log(outputs)

            if(this.useBrain){
                this.controls.fwd = outputs[0]
                this.controls.left = outputs[1]
                this.controls.right = outputs[2]
                this.controls.rev = outputs[3]
            }

            this.polygon = this.createPolygon()
            this.crashed = this.checkCrash(roadSegments)

            this.checkChkpts(checkpoints)

            // if(this.checkCrash(checkpoints)){
            //     this.crossed += 1
            //     console.log(this.crossed)
            // }

            // if(!this.onChkpt){
            //     if(this.checkChkpts(checkpoints)){
            //         this.onChkpt = true
            //     }
            // }else{
            //     if(this.checkChkpts(checkpoints) == false){
            //         this.onChkpt = false
            //     }
            // }
        }

        // this.drawPoly(this.polygon)
    }

    checkChkpts = function(lineSegments){
        console.log(this.crossed)

        for(let i = 0; i < lineSegments.length; i++){
            if(polysIntersect(this.polygon, lineSegments[i])){

                this.crossed = i+1
                this.onChkpt = true
                return true
            }
        }
        // }

        return false
    }


    checkCrash = function(lineSegments){
        for(let i = 0; i < lineSegments.length; i++){
            if(polysIntersect(this.polygon, lineSegments[i])){
                // console.log('crash')
                return true
            }
        }
        return false
    }

    drawPoly = function(polygon){
        polygon.forEach(function(elem, i){
            
            if(i == 0){
                fill(255,0,0) //top right
            }
            if(i == 1){
                fill(0,255,0) //top left
            }
            if(i == 2){
                fill(0,0,255) //bottom right
            }
            if(i == 3){
                fill(0,255,255) //bottom left
            }

            circle(elem.x, elem.y, 5)
        });
    }

    createPolygon = function(){
        const points = []

        const diag = Math.hypot(this.w, this.h)/2
        const theta = Math.atan2(this.w, this.h)

        //Top Right
        points.push({
            x : this.centerX - Math.sin(this.angle - theta) * diag,
            y : this.centerY - Math.cos(this.angle - theta) * diag
        })

        //Top Left
        points.push({
            x : this.centerX - Math.sin(this.angle + theta) * diag,
            y : this.centerY - Math.cos(this.angle + theta) * diag
        })

        //Bottom Left
        points.push({
            x : this.centerX - Math.sin(Math.PI + this.angle - theta) * diag,
            y : this.centerY - Math.cos(Math.PI + this.angle - theta) * diag
        })

        //Bottom Right
        points.push({
            x : this.centerX - Math.sin(Math.PI + this.angle + theta) * diag,
            y : this.centerY - Math.cos(Math.PI + this.angle + theta) * diag
        })

        return points
        
    }

    move = function(){
        if(this.controls.fwd){
            this.speed += this.acc
        }

        if(this.controls.rev){
            this.speed -= this.acc
        }

        

        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed
        }

        if(this.speed < -this.maxSpeed/1.5){
            this.speed = -this.maxSpeed/1.5
        }

        if(this.speed != 0){
            const flip = this.speed>0 ? 1: -1
            if(this.controls.left){
                this.angle += this.turnRad*flip
            }
    
            if(this.controls.right){
                this.angle -= this.turnRad*flip
            }
        }

        if(this.speed > 0){
            this.speed -= this.friction
        }
        
        if(this.speed < 0){
            this.speed += this.friction
        }

        if(Math.abs(this.speed) < this.friction){
            this.speed = 0
        }
        this.x -= Math.sin(this.angle)*this.speed 
        this.centerX = this.x + this.w/2
  
        this.y -= Math.cos(this.angle)*this.speed
        this.centerY = this.y + this.h/2

        // console.log(this.x, " ", this.centerX)
    }
}