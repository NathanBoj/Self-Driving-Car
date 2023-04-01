class Checkpoint{
    constructor(chkPtSeg){
        
        // const beginP1 = {x: 250, y: height-100}
        // const endP1 = {x: 260, y: height-500}

        // const beginP2 = {x: 260, y: height-500}
        // const endP2 = {x: 600, y: height-550} 

        this.chkPtSeg = chkPtSeg
    }


    show = function(){

        stroke(0)
        strokeJoin(ROUND)
        strokeWeight(3)

        
        for(let i = 0; i < this.chkPtSeg.length; i++){
            beginShape()
            vertex(this.chkPtSeg[i][0].x, this.chkPtSeg[i][0].y)
            vertex(this.chkPtSeg[i][1].x, this.chkPtSeg[i][1].y)
            endShape()
        }

    }
}