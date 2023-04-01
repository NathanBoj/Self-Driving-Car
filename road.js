class Road{
    constructor(roadSegments){

        this.roadSegments = roadSegments
    }


    show = function(){
        stroke(255,255,0)
        strokeJoin(ROUND)
        strokeWeight(3)

        fill(180, 180, 180) //Outside Segments filled with grey
        beginShape()
        for(let i = 0; i < 14; i++){
                vertex(this.roadSegments[i][0].x, this.roadSegments[i][0].y)
                vertex(this.roadSegments[i][1].x, this.roadSegments[i][1].y)
        }
        endShape()

        stroke(255,255,255)
        fill(34, 130, 21) //inside segments filled with same green as background
        beginShape()
        for(let i = 14; i < 26; i++){
                vertex(this.roadSegments[i][0].x, this.roadSegments[i][0].y)
                vertex(this.roadSegments[i][1].x, this.roadSegments[i][1].y)
        }
        endShape()

        
    }
}