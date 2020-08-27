
let inputbox=[]; 
let hash;

function setup() {

  createCanvas(800, 1500);
  frameRate(10);
  rectMode(CENTER);
  for(let i=0;i<13;i++)
  {
    let b=new Block(i,width/2,100*i+150,10,-5000,-5000);
    inputbox.push(b);
    console.log(inputbox[i].y);
  }
  for(let set=0;set<2;set++)
  {
  background(220);
  inputbox[0].show();
 
  for (let i = 1; i < inputbox.length; i++) {
    
  
    if(mouseX>inputbox[i].x-300&&mouseX<inputbox[i].x+300&&mouseY>inputbox[i].y-50&&mouseY<inputbox[i].y+50)
    {
      inputbox[i].color= color(0, 255, 0);
      inputbox[i].inputX=inputbox[i].x-50;
      inputbox[i].inputY=inputbox[i].y;

      
    }
    else {
      inputbox[i].color= color(255, 255, 255);
      inputbox[i].inputX=-5000;
      inputbox[i].inputY=-5000;
    }
    inputbox[i].inputdata();
    inputbox[i].show();
    
  }
}

}

function touchStarted() {
  for(let set=0;set<2;set++)
  {
  background(220);
  inputbox[0].show();
 
  for (let i = 1; i < inputbox.length; i++) {
    
  
    if(mouseX>inputbox[i].x-300&&mouseX<inputbox[i].x+300&&mouseY>inputbox[i].y-50&&mouseY<inputbox[i].y+50)
    {
      inputbox[i].color= color(0, 255, 0);
      inputbox[i].inputX=inputbox[i].x-50;
      inputbox[i].inputY=inputbox[i].y;

      
    }
    else {
      inputbox[i].color= color(255, 255, 255);
      inputbox[i].inputX=-5000;
      inputbox[i].inputY=-5000;
    }
    inputbox[i].inputdata();
    inputbox[i].show();
    
  }
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
    this.checkhash='';
    this.input=createInput('','number');
    this.input.position(-5555,-5555);
    this.active=false;
  }

  inputdata()
  {
    
    this.input.size(190,100);
    
    this.input.style('font-size', '28px');
    this.input.style('text-align', 'center');
    this.input.position(this.inputX-250,this.inputY-50);
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
    rect(this.x-200, this.y, 200,100);
   
    rect(this.x+200, this.y, 200,100);
    fill(this.color);
   
    rect(this.x, this.y, 200,100);
fill(0,0,0);
    textSize(32)
    textAlign(CENTER)
    text(this.nonce, this.x, this.y);
    text(this.data, this.x-200, this.y);
    text(this.hash, this.x+200, this.y);
  }
  calculate(data,oldhash)
  {
    if(!this.active)
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
   
    
      this.active=true;
    }
    else
    {
      this.hash='';
      this.nonce='';
      this.data='';
      this.input.value('');
    }
  }
  else
  {
    let hash=0;
    hash=parseInt(data)+oldhash;
    this.nonce=5-(data%5);
    if( this.nonce==5)
    {
      this.nonce=0;
    }
    this.hash=hash+this.nonce;
   
    this.hash=sha256(this.hash).slice(0,4);
    
  }
  }
 
}

var sha256 = function sha256(ascii) {
  function rightRotate(value, amount) {
      return (value>>>amount) | (value<<(32 - amount));
  };
  
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length'
  var i, j; // Used as a counter across the whole file
  var result = ''

  var words = [];
  var asciiBitLength = ascii[lengthProperty]*8;
  
  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  var hash = sha256.h = sha256.h || [];
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  var k = sha256.k = sha256.k || [];
  var primeCounter = k[lengthProperty];
  /*/
  var hash = [], k = [];
  var primeCounter = 0;
  //*/

  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
          for (i = 0; i < 313; i += candidate) {
              isComposite[i] = candidate;
          }
          hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
          k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
      }
  }
  
  ascii += '\x80' // Append Ƈ' bit (plus zero padding)
  while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j>>8) return; // ASCII check: only accept characters in range 0-255
      words[i>>2] |= j << ((3 - i)%4)*8;
  }
  words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
  words[words[lengthProperty]] = (asciiBitLength)
  
  // process each chunk
  for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
      var oldHash = hash;
      // This is now the undefinedworking hash", often labelled as variables a...g
      // (we have to truncate as well, otherwise extra entries at the end accumulate
      hash = hash.slice(0, 8);
      
      for (i = 0; i < 64; i++) {
          var i2 = i + j;
          // Expand the message into 64 words
          // Used below if 
          var w15 = w[i - 15], w2 = w[i - 2];

          // Iterate
          var a = hash[0], e = hash[4];
          var temp1 = hash[7]
              + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
              + ((e&hash[5])^((~e)&hash[6])) // ch
              + k[i]
              // Expand the message schedule if needed
              + (w[i] = (i < 16) ? w[i] : (
                      w[i - 16]
                      + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                      + w[i - 7]
                      + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                  )|0
              );
          // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
          var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
              + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
          
          hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
          hash[4] = (hash[4] + temp1)|0;
      }
      
      for (i = 0; i < 8; i++) {
          hash[i] = (hash[i] + oldHash[i])|0;
      }
  }
  
  for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
          var b = (hash[i]>>(j*8))&255;
          result += ((b < 16) ? 0 : '') + b.toString(16);
      }
  }
  return result;
};