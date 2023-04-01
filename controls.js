class Controls{
    constructor(type){
        this.fwd = false
        this.rev = false
        this.left = false
        this.right = false


        // switch(type){
        //     case "KEYS":
                
        // }

    }

    keyDown = function(key){
        switch(key){
            case "ArrowUp":
                this.fwd = true
                break
            case "ArrowDown":
                this.rev = true
                break
            case "ArrowLeft":
                this.left = true
                break
            case "ArrowRight":
                this.right = true
                break
        }

        // console.table(this)
    }


    keyUp = function(key){
        switch(key){
            case "ArrowUp":
                this.fwd = false
                break
            case "ArrowDown":
                this.rev = false
                break
            case "ArrowLeft":
                this.left = false
                break
            case "ArrowRight":
                this.right = false
                break
        }

        // console.table(this)
    }
}