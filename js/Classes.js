class Cheese {
  constructor({ x, y,}) {
    this.x = x
    this.y = y
    this.width = 400
    this.height = 400
    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
  }
    this.loaded = false
    this.type = {
        Babibel: new Image(),
        Manchego: new Image(),
        Parmesano: new Image(),
        Roquefort: new Image(),
        Brie: new Image(),
        Camembert: new Image(),
        Gouda: new Image(),
        Edam: new Image(),
        Cheddar: new Image()
    }
    this.type.Babibel.src = 'img/cheese/Babibel.png'
    // this.type.Manchego.src = 'img/cheese/Manchego.png'
    // this.type.Parmesano.src = 'img/cheese/Parmesano.png'
    // this.type.Roquefort.src = 'img/cheese/Roquefort.png'
    // this.type.Brie.src = 'img/cheese/Brie.png'
    // this.type.Camembert.src = 'img/cheese/Camembert.png'
    // this.type.Gouda.src = 'cheese/Gouda.png'
    // this.type.Edam.src = 'cheese/Edam.png'
    // this.type.Cheddar.src = 'cheese/Cheddar.png'

    this.img = this.type.Babibel

    this.img.onload = () => {
      // Image loaded, you can perform any additional setup here if needed
    this.loaded = true
    }
  }


  draw(c) {
    if (!this.loaded) return
    c.fillStyle = 'rgba(255, 255, 255, 0.5)'
    c.fillRect(this.x, this.y, this.width, this.height)
    c.drawImage(this.img, this.x, this.y, this.width, this.height)
   }
}   // 


