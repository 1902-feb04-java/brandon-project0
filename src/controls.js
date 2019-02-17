
let brushState = true //alive


document.getElementById('toggle_brush_state').addEventListener('click', changeState);

function changeState(){
    brushState = !brushState;
    // console.log(brushState);
}