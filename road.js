class Road{
    constructor(roadSegments){
        
        const beginP1 = {x: 250, y: height-100}
        const endP1 = {x: 260, y: height-500}

        const beginP2 = {x: 260, y: height-500}
        const endP2 = {x: 600, y: height-550} 


        // this.borders = [
        //     [beginP1, endP1],
        //     [beginP2, endP2]
        // ]

        this.roadSegments = roadSegments
    }


    show = function(){
        stroke(255)
        strokeJoin(ROUND)
        strokeWeight(3)
        // this.roadSegments.forEach(border => {
        //     line(border[0].x, border[0].y, border[1].x, border[1].y)
        // });

        fill(180, 180, 180) //Outside Segments filled with grey
        beginShape()
        for(let i = 0; i < 14; i++){
                vertex(this.roadSegments[i][0].x, this.roadSegments[i][0].y)
                vertex(this.roadSegments[i][1].x, this.roadSegments[i][1].y)
        }
        endShape()

        fill(34, 130, 21) //inside segments filled with same green as background
        beginShape()
        for(let i = 14; i < 26; i++){
                vertex(this.roadSegments[i][0].x, this.roadSegments[i][0].y)
                vertex(this.roadSegments[i][1].x, this.roadSegments[i][1].y)
        }
        endShape()

        
    }
}