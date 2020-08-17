
let inputbox=[]; 

function setup() {
  createCanvas(800, 1500);
  rectMode(CENTER);
  for(let i=0;i<13;i++)
  {
    let b=new Block(i,width/2,100*i+150,10,-5000,-5000);
    inputbox.push(b);
    console.log(inputbox[i].y);
  }
 
}

function draw() {
  background(220);
  inputbox[0].show();
  for (let i = 1; i < inputbox.length; i++) {
    
  
    if(mouseX>inputbox[i].x-100&&mouseX<inputbox[i].x+100&&mouseY>inputbox[i].y-50&&mouseY<inputbox[i].y+50)
    {
      inputbox[i].color= color(0, 255, 0);
      inputbox[i].inputX=inputbox[i].x;
      inputbox[i].inputY=inputbox[i].y;
      
    }
    else{
      inputbox[i].color= color(255, 255, 255);
      inputbox[i].inputX=-5000;
      inputbox[i].inputY=-5000;
    }
    inputbox[i].show();
    inputbox[i].inputdata();
  }
}

class Block {
  constructor(index,x, y, inputX,inputY) {
    this.x = x;
    this.y = y;
    this.index=index;
    this.inputX=inputX;
    this.inputY=inputY;
    this.color = color(255, 255, 255);
    this.nonce='Nonce';
    this.data='Data';
    this.hash='Hash';
    this.input=createInput('','number');
    this.input.position(-5555,-5555);
  }

  inputdata()
  {
    
    this.input.size(200,100);
    
    this.input.style('font-size', '28px');
    this.input.style('text-align', 'center');
    this.input.position(this.inputX-100,this.inputY-50);
    this.data=this.input.value();
    if(this.index<2)
    {
    this.calculate(this.data,14);
    }
    else{
      this.calculate(this.data,inputbox[this.index-1].hash);
    }
   
  }

  show() {
    fill(255,255,255);
    rect(this.x-150, this.y, 200,100);
   
    rect(this.x+150, this.y, 200,100);
    fill(this.color);
   
    rect(this.x, this.y, 200,100);
fill(0,0,0);
    textSize(32)
    textAlign(CENTER)
    text(this.nonce, this.x-175, this.y);
    text(this.data, this.x, this.y);
    text(this.hash, this.x+175, this.y);
  }
  calculate(data,oldhash)
  {
    if(this.input.value()!=''&&inputbox[this.index-1].hash!='')
    {
      let hash=0;
      hash=parseInt(data)+oldhash;
      this.nonce=5-(hash%5);
      if( this.nonce==5)
      {
        this.nonce=0;
      }
      this.hash=hash+this.nonce;
    }
    else
    {
      this.hash='';
      this.nonce='';
    }
  }
}