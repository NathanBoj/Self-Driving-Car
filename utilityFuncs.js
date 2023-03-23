function linInt(A, B, t){
    return A+(B-A)*t
}

function getIntersect(A, B, C, D){

    const nume = (D.x - C.x)*(A.y - C.y) - (D.y - C.y)*(A.x - C.x)
    
    const numeU = (C.y - A.y)*(A.x - B.x) - (C.x - A.x)*(A.y - B.y)

    const denom = (D.y - C.y)*(B.x - A.x) - (D.x - C.x)*(B.y - A.y)

    if(denom != 0){
        const t = nume/denom
        const u = numeU/denom
        if(t >= 0 && t<= 1 && u >= 0 && u <= 1){
            return {
                x: linInt(A.x, B.x, t),
                y: linInt(A.y, B.y, t),
                offset: t
            }
        } 
    }

    return null
    
}

function polysIntersect(poly1, poly2){

    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {

            const touch = getIntersect(
                poly1[i],
                poly1[(i+1) % poly1.length],
                poly2[j],
                poly2[(j+1) % poly2.length]
            )
            
            if(touch){
                return true
            }
        }
        
    }

    return false
}



roadLines = [
    [{x: 140, y: 660}, {x: 140, y: 290}],
    [{x: 140, y: 290}, {x: 180, y: 180}],
    [{x: 180, y: 180}, {x: 370, y: 50}],
    [{x: 370, y: 50}, {x: 500, y: 50}],
    [{x: 500, y: 50}, {x: 730, y: 300}],
    [{x: 730, y: 300}, {x: 780, y: 340}],
    [{x: 780, y: 340}, {x: 880, y: 360}],
    [{x: 880, y: 360}, {x: 1060, y: 440}],
    [{x: 1060, y: 440}, {x: 1090, y: 520}],
    [{x: 1090, y: 520}, {x: 1090, y: 620}],
    [{x: 1090, y: 620}, {x: 1000, y: 750}],
    [{x: 1000, y: 750}, {x: 400, y: 780}],
    [{x: 400, y: 780}, {x: 220, y: 750}],
    [{x: 220, y: 750}, {x: 140, y: 660}], //Outside Border until here -- 14 segments

    [{x: 250, y: 660}, {x: 250, y: 300}],
    [{x: 250, y: 300}, {x: 300, y: 200}],
    [{x: 300, y: 200}, {x: 400, y: 150}],
    [{x: 400, y: 150}, {x: 500, y: 160}],
    [{x: 500, y: 160}, {x: 700, y: 400}],
    [{x: 700, y: 400}, {x: 800, y: 450}],
    [{x: 800, y: 450}, {x: 900, y: 450}],
    [{x: 900, y: 450}, {x: 990, y: 500}],
    [{x: 990, y: 500}, {x: 990, y: 600}],
    [{x: 990, y: 600}, {x: 940, y: 670}],
    [{x: 940, y: 670}, {x: 400, y: 700}],
    [{x: 400, y: 700}, {x: 250, y: 660}] //Inside Border until here -- 12 segments

    
    
]
