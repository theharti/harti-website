let inputDirection={x:0,y:0};
let lastInputDirection={x:0,y:0};
window.addEventListener('keydown',e=>{
    switch(e.key){
        case 'ArrowUp':
            e.preventDefault();
            if(lastInputDirection.y!==0)break
            inputDirection={x:0,y:-1};
            break;
        case 'ArrowDown':
            e.preventDefault();
            if(lastInputDirection.y!==0)break
            inputDirection={x:0,y:1};
            break;
        case 'ArrowLeft':
            e.preventDefault();
            if(lastInputDirection.x!==0)break
            inputDirection={x:-1,y:0};
            break;
        case 'ArrowRight':
            e.preventDefault();
            if(lastInputDirection.x!==0)break
            inputDirection={x:1,y:0};
            break;
        case 'w':
            if(lastInputDirection.y!==0)break
            inputDirection={x:0,y:-1};
            break;
        case 's':
            if(lastInputDirection.y!==0)break
            inputDirection={x:0,y:1};
            break;
        case 'a':
            if(lastInputDirection.x!==0)break
            inputDirection={x:-1,y:0};
            break;
        case 'd':
            if(lastInputDirection.x!==0)break
            inputDirection={x:1,y:0};
            break;
    }
})

export function getInputDirection(){
    lastInputDirection=inputDirection;
    return inputDirection;
}