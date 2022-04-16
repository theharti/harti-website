var len=10;

var wall='rgb(154, 65, 65)';
var original='rgb(52, 52, 52)';
var path='rgb(123, 146, 238)';

function setup(){
    var maze_container=document.getElementById('maze_container');

    for (var i=0;i<10;i++){
        var row=document.createElement('div');
        row.className='row row'+(i+1);
        row.id='row'+(i+1);

        for (var j=0;j<10;j++){
            var node=document.createElement('div');
            node.className='node node'+((i*10)+(j+1));
            node.id='node'+((i*10)+(j+1));
            if(((i*10)+(j+1))!=1 && ((i*10)+(j+1))!=100){
                node.style.backgroundColor=original;
                
                node.onclick=function(){
                    clicked(this.id);

                }
            }
            row.appendChild(node);
        }
        maze_container.appendChild(row);   
    }
}
function clicked(elementID){
    var node=document.getElementById(elementID);
    if(node.style.backgroundColor==wall){
        node.style.backgroundColor=original;
    }
    else{
        node.style.backgroundColor=wall;
    }

}
/*function dragged(elementID){
    let drag=false;
    document.addEventListener('mousedown', () => drag = false);
    document.addEventListener('mousemove', () => drag = true);
    document.addEventListener('mouseup', () => console.log(drag ? 'drag' : 'click'));
}*/
function reset(){
    for (var i=2;i<100;i++){
        var node=document.getElementById('node'+i);
        node.style.backgroundColor=original;
    }
    document.getElementById('node1').style.backgroundColor='rgb(50, 205, 50)';
    document.getElementById('node100').style.backgroundColor='rgb(255, 127, 80)';
}
function solveMazeBFS(){
    
    
    if(hasWall()){
        alert("you are trying to replace Walls, I am going to reset");
        reset();
        return;
    }
    var maze=[];
    for(let i=0;i<len;i++){
        maze[i]=new Array(len).fill(0);
    }
    var rowCount=0;
    var colCount=0;
    var nodeVal=1;
    for(var i=1;i<(len*len+1);i++){
        if(document.getElementById('node'+i).style.backgroundColor==wall){
            maze[rowCount][colCount]=-1;
        }
        else{
            maze[rowCount][colCount]=nodeVal

        }
        colCount++;
        if(colCount==len){
            rowCount++;
            colCount=0;
        }
        nodeVal++;

    }
    var adjList={};

    var possibleMoves=[
        [-1,0],
        [1,0],
        [0,1],
        [0,-1],
    ];
    for(var row=0;row<maze.length;row++){
        for(var col=0;col<maze[row].length;col++){
            if(maze[row][col]==-1){
                continue;
            }
            var currNode=maze[row][col];
            var neighbours=[];
            for (var count=0;count<possibleMoves.length;count++){
                var nRow=possibleMoves[count][0]+row;
                var nCol=possibleMoves[count][1]+col;

                if((nRow>=0 && nRow<maze.length) && (nCol>=0 && nCol<maze[0].length)){
                    if(maze[nRow][nCol]!=-1){
                        neighbours.push([nRow,nCol]);
                    }
                }
            }
            adjList[currNode]=neighbours;

        }
        
    }
    var visited=[];
    var prev=new Array(len*len).fill(0);

    for(var i=0;i<len;i++){
        visited[i]=new Array(len).fill(false);

    }
    var queue=[];

    var solved=false;

    queue.push([0,0]);
    while(queue.length>0){
        var nodeCoor=queue.splice(0,1)[0];
        var node=maze[nodeCoor[0]][nodeCoor[1]];

        visited[nodeCoor[0]][nodeCoor[1]]=true;
        if(nodeCoor[0]==9&&nodeCoor[1]==9){
            solved=true;
            break;
        }
        var adj=adjList[node];
        for(var count=0;count<adj.length;count++){
            
            var n=adj[count];
            if(!visited[n[0]][n[1]]){
                visited[n[0]][n[1]]=true;
                queue.push(n);
                prev[(maze[n[0]][n[1]])-1]=node-1;
            }

        }

    }
    if(!solved){
        alert("This maze is impossible: reset");
        reset();
        return"";
    }
    

    var endNode=maze[9][9];
    document.getElementById('node'+endNode).style.backgroundColor=path;

    var previous=endNode-1;
    var loopControl=false;

    while(true){
        var node=prev[previous];

        try{
            document.getElementById('node'+(node+1)).style.backgroundColor=path;
            
        }catch(err){
            loopControl=true;
        }
        if(node==0){
            loopControl=true;
        }else{
            previous=node;
        }

        if(loopControl){
            break;
        }

    }
    document.getElementById('node1').style.backgroundColor=path;
    
}
function hasWall(){
    for(var i=1; i<101; i++){
        if(document.getElementById('node'+i).style.backgroundColor == path){
            return true;
        }
        
        
    }
    return false;
}
function changeAlgo(){
    var algorithm=document.getElementById("algorithms");
    var selectedValue=algorithms.options[algorithms.selectedIndex].value;
    
    if(selectedValue==1){
        
        solveMazeBFS();
        
    }
    if(selectedValue==2){
        solveMazeBFS();
    }
    
}