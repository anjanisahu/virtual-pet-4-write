class Form{
    constructor(){
        //this.image = loadImage("images/bg.jpg");
    }
    display(){
        background(rgb(255, 221, 242))
        var title = createElement("h2");
        title.html("Enter Your Pet's Name");
        title.position(400,200);

        var title2 = createElement("h2");
        title2.html("Enter Your Name");
        title2.position(400,70);

        var input = document.getElementById("name");

        var input2 = document.getElementById("pet");

        var button = createButton("Next");
        button.position(400,350);
        
//image(image1,0,0,width,height);
        button.mousePressed(function(){
            name1 = input2.value;
            name2 = input.value;
            
            if(name2.length>2 && name1.length>2){
            button.hide();
            title.hide();
            input.style.display="none";
            input2.style.display="none";
            title2.hide();
            //input2.hide();
            game.update(1);
            //add.style.display="inline-block";
            }

            if(name2.length<2 ){
                input.style.border="2px solid red";
                fill("red");
                textSize(15);
                text("* Too short",50,150);
            }
            if(name1.length<2 ){
                input2.style.border="2px solid red";
                fill("red");
                textSize(15);
                text("* Too short",50,290);
            }

        });
    }
}