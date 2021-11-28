class Tablero {
  constructor(ancho, alto, minas){
    this.ancho = ancho;
    this.alto = alto;
    this.minas = minas;
    this.crearTablero()
    this.colocarMinas();
    this.colocarNumeros();
    document.getElementById("mensaje").innerHTML = this.dibujarTablero()

  }

  crearTablero() {
    this.tablero = new Array(this.alto)

    for (let i = 0; i < this.alto; i++) {
      this.tablero[i] = new Array(this.ancho)
      for (let z = 0; z < this.ancho; z++) {
        this.tablero[i][z] = "0";
      }
    }
  }

  colocarMinas(){
    let contador = 0
    while (contador < this.minas) {
      let x = Math.floor(Math.random()*this.ancho)
      let y = Math.floor(Math.random()*this.alto)

      if (this.tablero[x][y] == "0"){
        this.tablero[x][y] = "M"
        contador++
      }
    }
  }

  minasAlrededor(p,k){
    let coordsP = [p-1,p,p+1].filter(p => {return p >= 0 && p < this.ancho})
    let coordsk = [k-1,k,k+1].filter(k => {return k >= 0 && k < this.alto})

    let contador = 0;

    for (let varP of coordsP) {
      for (let varK of coordsk) {
        if(this.tablero[varP][varK] == "M"){
          contador++
        }
      }
    }
    return contador
  }

  colocarNumeros(){
    for (let i = 0; i < this.alto; i++) {
      for (let z = 0; z < this.ancho; z++) {
        if (this.tablero[i][z] !== "M"){
          let total = this.minasAlrededor(i,z)
          this.tablero[i][z] = total;
        }
      }
    }
  }

  dibujarTablero(){
    let salida = ""
    salida += "<p>";
    for (let i = 0; i < this.alto; i++) {

      for (let z = 0; z < this.ancho; z++) {
        salida += "<button class='boton' value='"+this.tablero[i][z]+"'></button>"
      }
      salida += "<br/>";
    }
    salida += "</p>";
    return salida
  }
}


function empezarPartida(){
  let ancho = document.getElementById("ancho").value;
  let alto = document.getElementById("alto").value;
  let minas = document.getElementById("minas").value;


  tablero = new Tablero(ancho,alto,minas);
  console.log(tablero)

  /*let botones = document.querySelectorAll(".boton");

  for (let boton of botones) {
    boton.addEventListener("click", seleccionarBoton);
  }*/

}
/*
function seleccionarBoton(e){
  e.target().value()
}
*/
let tablero

document.getElementById("jugar").addEventListener("click", empezarPartida);
