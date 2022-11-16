// Make the DIV element draggable:
class Vector2f {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};
class Vector3f {
    x = 0;
    y = 0;
    z = 0;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
};

class Object2D {
    origin = new Vector2f(0, 0);
    position = new Vector3f(0, 0, 0);
    selected = false;

    FactorCorrection = new Vector2f(0, 0);
    DefaultPosition = new Vector3f(0, 0, 0);
    constructor(id, position = new Vector3f(0, 0, 0), origin = new Vector2f(0, 0)) {
        this.id = id;
        this.origin = origin;
        this.position = position;
        this.from = [];
        this.to = [];
        this.RigBody = document.getElementById(this.id);
        this.height = this.RigBody.clientHeight;
        this.width = this.RigBody.clientWidth;
        // this.FactorCorrector();
        console.log(px(this.position.z));
        this.DefaultPosition.x = this.RigBody.getBoundingClientRect().x - this.origin.x;
        this.DefaultPosition.y = this.RigBody.getBoundingClientRect().y - this.origin.y;


        this.SetPosition(position); //Set the position after creating an object
        this.__Style__ = new Style(this);
    }

    FactorCorrector() {
        var x__ = document.getElementById("SIDEBAR_DIV").clientWidth;
        this.FactorCorrection.y = document.getElementById("HEADER_DIV").clientHeight;
        this.FactorCorrection.x = x__;
        this.origin.y = this.origin.y + this.FactorCorrection.y;
        this.origin.x = this.origin.x + this.FactorCorrection.x;
        console.log(this.FactorCorrection);
    }
    SetPosition(new_position) {

        document.getElementById(this.id).style.position = "absolute";
        document.getElementById(this.id).style.left = px(new_position.x - this.origin.x);
        document.getElementById(this.id).style.top = px(new_position.y - this.origin.y);
        var x = new_position.x - this.origin.x;
        var y = new_position.y - this.origin.y;
        var z = new_position.z;
        this.RigBody.style.zIndex = z.toString();
        this.position = new Vector3f(x, y, z);

    }

    SetOriginCenter() {
        this.origin.x = this.RigBody.clientWidth / 2;
        this.origin.y = this.RigBody.clientHeight / 2;
        this.SetPosition(this.position);
    }
    intersects(point = new Vector2f(0, 0)) {
        var OriginX = this.origin.x;
        var OriginY = this.origin.y;
        var PosX = this.position.x;
        var PosY = this.position.y;
        var minX = PosX - OriginX + this.FactorCorrection.x;
        var minY = PosY - OriginY + this.FactorCorrection.y;
        var maxX = PosX + OriginX + this.FactorCorrection.x;
        var maxY = PosY + OriginY + this.FactorCorrection.y;
        if (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY) {
            return true;
        } else {
            return false;
        }
    }



    dragElement() {
        const WorkOnObj = this;
        var elmnt = this.RigBody;
        var position = this.position;
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;

            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
            for (var i = 0; i < listed_vector.length; i++) {
                if ((listed_vector[i].start_object == WorkOnObj) || (listed_vector[i].end_object == WorkOnObj)) {
                    listed_vector[i].DeleteVector();
                }

            }
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();

            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            this.position = new Vector3f(elmnt.offsetLeft - pos1, elmnt.offsetTop - pos2, position.z);
            WorkOnObj.position = new Vector3f(elmnt.offsetLeft - pos1, elmnt.offsetTop - pos2, position.z);


        }

        function closeDragElement() {
            var list_temp_vectors_to_be_modified = [];
            for (var j = 0; j < listed_vector.length; j++) {

                if ((listed_vector[j].start_object == WorkOnObj) || (listed_vector[j].end_object == WorkOnObj)) {
                    list_temp_vectors_to_be_modified.push(listed_vector[j]);
                }
            }

            var k = 0;
            var len_of_temp_vectors = list_temp_vectors_to_be_modified.length;
            while (k < len_of_temp_vectors) {
                console.log(list_temp_vectors_to_be_modified[k]);
                list_temp_vectors_to_be_modified[k].CreateVector();
                k++;
            }
            list_temp_vectors_to_be_modified = null;
            document.onmouseup = null;
            document.onmousemove = null;

        }


    }
};
//Styles 
class Style {
    constructor(object = new Object2D("", new Vector3f(0, 0, 0), Vector2f(0, 0))) {
        this.Object = object;
    }

    selector() {
        let selector = document.getElementById(this.Object.RigBody.id.toString() + "header");
        selector.style.padding = "5px";
        selector.style.cursor = "move";
        selector.style.backgroundColor = "#2196F3";
        selector.style.color = "#fff";
    }
    Main_Container() {
        this.Object.RigBody.style.position = "absolute";
        this.Object.RigBody.style.backgroundColor = "#f1f1f1";
        this.Object.RigBody.style.border = "1px solid #d3d3d3";
        this.Object.RigBody.style.textAlign = "center";
    }

};
class CreateAssosiatedRigBody{
    constructor(){
        this.Object = null;
        
    }
    CodeField(CodeKey,CodeObject){
        var ObjectPosition = new Vector3f(CodeObject['position']['x'], CodeObject['position']['y'],CodeObject['position']['z']);
        var id = "Code"+"_"+CodeKey.toString();
// CODE area 
        const NewCodeField = document.createElement("div");
        NewCodeField.setAttribute("id",id);
        //Header 
        const HeaderDiv = document.createElement("div");
        HeaderDiv.setAttribute("id",id+"header");
        HeaderDiv.setAttribute("class","Roboto_Font");
        HeaderDiv.innerHTML = "Adjust Position <b>STEP</b>";
        
        
        //input div
        const TextAreaContainer = document.createElement("div");
        TextAreaContainer.setAttribute("class","code_area");
        //textarea 
        const NewTextArea = document.createElement("textarea");
        NewTextArea.setAttribute("name",id+"_textareaNAME");
        NewTextArea.setAttribute("id",id+"_textareaID");
        NewTextArea.setAttribute("cols",40);
        NewTextArea.setAttribute("rows",10);
        NewTextArea.setAttribute("placeholder","Enter your codes");
        NewTextArea.onclick = keyHandler;
        TextAreaContainer.appendChild(NewTextArea);

        //Submit
        const SubmitDiv = document.createElement("div");
        SubmitDiv.style.padding = "2px";

        const NewButton_submit  = document.createElement("button");
        NewButton_submit.setAttribute("class","update-code Roboto_Font");
        NewButton_submit.innerText = "Update";
        SubmitDiv.appendChild(NewButton_submit);

        NewCodeField.appendChild(HeaderDiv);
        NewCodeField.appendChild(TextAreaContainer);
        NewCodeField.appendChild(SubmitDiv);
        document.body.appendChild(NewCodeField);



        var CodeObject = new Object2D(id,new Vector3f(0,0,0),new Vector2f(0,0));
        CodeObject.SetOriginCenter();
        CodeObject.SetPosition(ObjectPosition);
        return CodeObject;


    }
};

/// THIS LIST KEEPS ALL THE VECTORS 

var listed_vector = [];//SAVES THE VECTOR
var listed_objects = [];//keeps all the boject and their properties 
var linker_steps = [];


// THIS IS THE POINTING VECTOR FROM ONE OBJECT TO OTHER OBJECT THIS CLASS REPRESENTS THE LINES ;
class Vector {
    id = null;
    constructor(start_object = new Object2D, end_object = new Object2D, id) {
        start_object.to.push(end_object);
        end_object.from.push(start_object);
        this.start_object = start_object;
        this.end_object = end_object;

        this.id = id;

    }
    // CREATE THE VECTOR 
    CreateVector() {
        // create the svg element
        var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var sx = this.start_object.position.x + this.start_object.width / 2;//s for start e for end 
        var ex = this.end_object.position.x + this.end_object.width / 2;
        var sy = this.start_object.position.y + this.start_object.height / 2;
        var ey = this.end_object.position.y + this.end_object.height / 2;

        // set width and height
        var del_x = ex - sx;  // THIS IS THE VECTOR BETWEEN TWO POINTS ITS A 2d MATRICS DEL_X / Y;
        var del_y = ey - sy;

        var trace_x = this.end_object.position.x - this.start_object.position.x;
        var trace_y = -this.end_object.position.y + this.start_object.position.y;

        /// DETRMINES THE DEGREE OF ROTAION WITH THE HELP OF POSITIVE THETA FUNCTION WHICH DETERMINE THE x , x' AND y , y' ;
        var theta = 0;
        if (trace_x == 0) {
            theta = 270;
        }
        else if (trace_y == 0) {
            theta = 0;
        }
        else {
            theta = positive_theta(trace_x, trace_y, Math.abs(Math.atan(del_y / del_x) * 57.2958));
        }


        // SVG IMAGE HEIGHT AND WIDTH RELATIVE TO THE WINDOW HEIGHT ;
        svg1.setAttribute("width", px(window.innerWidth * 6));
        svg1.setAttribute("height", px(window.innerHeight * 6));
        svg1.setAttribute("id", this.id.toString());


        // cREATE THE LINE IN SVG
        const cir1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
        );

        cir1.setAttribute("fill", "black");
        cir1.setAttribute("transform", "translate(" + (this.start_object.position.x + this.start_object.origin.x).toString() + "," + (this.start_object.position.y + this.start_object.origin.y).toString() + ") rotate(" + theta.toString() + ")");

        var line = ">";
        var len_of_line = Math.round(Math.sqrt((Math.pow(this.start_object.position.x - this.end_object.position.x, 2) + Math.pow(this.start_object.position.y - this.end_object.position.y, 2))) / 9.5);
        console.log('len');

        console.log(len_of_line);

        len_of_line = len_of_line;

        for (var count = 0; count < len_of_line; count++) {
            line = line + ">";
        }

        cir1.textContent = line;

        // attach it to the container
        svg1.appendChild(cir1);

        // attach container to document
        this.DeleteVector();//Delete the vector if exists . 
        var d = document.createElement("div");
        d.id = this.id.toString();
        d.style.position = "absolute";
        d.style.border = "1px solid black";


        document.body.appendChild(d);
        var svg_object = new Object2D(d.id, new Vector3f(0, 0, 0), new Vector2f(0, 0));
        svg_object.SetOriginCenter();
        var pos_svg_x = this.start_object.position.x - (window.innerWidth / 2) + this.start_object.width / 2;
        var pos_svg_y = this.start_object.position.y + this.end_object.height / 2 - (window.innerHeight / 2);

        //svg_object.SetPosition(new Vector3f(pos_svg_x, pos_svg_y, 0));
        document.getElementById(d.id).appendChild(svg1);
        //Create the vector after creation of the matrices

        for (var count_of_listed_vectors = 0; count_of_listed_vectors < listed_vector.length; count_of_listed_vectors++) {
            if (listed_vector[count_of_listed_vectors].id == this.id.toString()) {
                listed_vector[count_of_listed_vectors] = this;
                d = null;
                svg1 = null;
                console.log("craeteed the vector");
                return;
            }
        }
        listed_vector.push(this);
        d = null;
        svg1 = null;
        console.log("craeteed the vector");
    }
    DeleteVector() {
        if (document.getElementById(this.id.toString())) {
            let element = document.getElementById(this.id.toString());
            element.removeAttribute("id");
            element.remove();
        }


    }
};


function positive_theta(del_x, del_y, theta) {
    if (del_x > 0 && del_y > 0) {
        return (360 - theta);
    }
    else if (del_x < 0 && del_y > 0) {
        return (180 + theta);
    }
    else if (del_x < 0 && del_y < 0) {
        return (180 - theta);
    }
    else if (del_x > 0 && del_y < 0) {
        return (theta);
    }
}
function keyHandler(e) {
    if (e.keyCode = "9" && e.key == "Tab") {
        e.preventDefault();
        const start_target = e.target.selectionStart;
        console.log(e);
        const new_value = e.target.value.slice(0, start_target) + "    " + e.target.value.slice(start_target);
        e.target.value = new_value;
    }


}



function px(x) {
    if (x == "auto" || x == "none") {
        return x;
    } else {
        return x.toString() + "px";
    }

}


//dragElement(document.getElementById("mydiv"));










window.onload = async function (event) {
    let brain = new Object2D("brain", new Vector3f(0, 0, 0), new Vector2f(0, 0));
    brain.SetOriginCenter();
    brain.SetPosition(new Vector3f(window.innerWidth / 2, brain.origin.y, 10));
    brain.dragElement();


    let objec = new Object2D("mydiv", new Vector3f(0, 0, 0), new Vector2f(0, 0));
    objec.SetOriginCenter();
    objec.SetPosition(new Vector3f(objec.origin.x, objec.origin.y, 3));
    objec.SetPosition(new Vector3f(100, 500, 10));

    objec.dragElement();


    let objecs = new Object2D("mydivs", new Vector3f(0, 0, 0), new Vector2f(0, 0));
    objecs.SetOriginCenter();
    objecs.SetPosition(new Vector3f(1000, 100, 10));
    objecs.dragElement();


    let step = new Object2D("step", new Vector3f(0, 0, 0), new Vector2f(0, 0));
    step.SetOriginCenter();
    step.SetPosition(new Vector3f(step.origin.x, step.origin.y, 0));
    step.dragElement();
    step.__Style__.Main_Container();
    step.__Style__.selector();

    //there it goes the first writting on new home hope everything gonna work well insallah and I WILL be able to make dreams true .............


}


