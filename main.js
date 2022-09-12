//console.log({personas});

function representar() {
  const propiedad = document.querySelector("#inputPropiedades").value;
  const indicador = document.querySelector("#inputIndicador").value;
  const canva = document.querySelector("#myChart");

  console.log({canva})

  if (indicador && propiedad) {
    console.log({ indicador, propiedad });
    agrupar(indicador, propiedad);
  } else {
    chart({}, "");
  }
}

function agrupar(indicador, propiedad) {
  const propiedades = {};

  for (persona of personas) {
    if (indicador == "suma") {
      if (!propiedades[persona[propiedad]]) {
        propiedades[persona[propiedad]] = {};
        propiedades[persona[propiedad]] = 0;
      }
      propiedades[persona[propiedad]] += persona.salary;
    }

    if (indicador !== "suma") {
      if (!propiedades[persona[propiedad]]) {
        propiedades[persona[propiedad]] = [];
      }
      propiedades[persona[propiedad]].push(persona.salary);
    }
  }

  agruparData(propiedades, propiedad, indicador);
}

function agruparData(propiedades, propiedad, indicador) {
  if (indicador == "suma") {
    chart(propiedades, propiedad);
  } else {
    const propiedadesIndicadores = {};
    for (pro in propiedades) {
      if (!propiedadesIndicadores[pro]) {
        propiedadesIndicadores[pro] = {};
      }

      //calcular el resto de los indicadores
      switch (indicador) {
        case "promedio":
          propiedadesIndicadores[pro] = promedio(propiedades[pro]);
          break;
        case "moda":
          propiedadesIndicadores[pro] = moda(propiedades[pro]);
          break;
        default:
          propiedadesIndicadores[pro] = mediana(propiedades[pro]);
      }
    }
    chart(propiedadesIndicadores, propiedad);
    console.log(propiedadesIndicadores);
  }
}

function promedio(lista) {
  const tamano = lista.length;
  return lista.reduce((acu, val) => acu + val) / tamano;
}

function esPar(cantidad) {
  return !(cantidad % 2);
}

function ordenarLista(listaDesordenada) {
  //console.log({ listaDesordenada });
  return listaDesordenada.sort((a, b) => a - b);
}

function ordenarListaBidimensional(listaDesordenada) {
  console.log({ listaDesordenada });
  return listaDesordenada.sort((a, b) => a[1] - b[1]);
}

function mediana(listaDesordenada) {
  const listaOrdenada = ordenarLista(listaDesordenada);
  const tamano = listaOrdenada.length;
  const posicion = Math.floor(tamano / 2);
  const isPar = esPar(tamano);

  if (isPar) {
    return promedio([listaOrdenada[posicion], listaOrdenada[posicion - 1]]);
  } else {
    return listaOrdenada[posicion];
  }
}

function moda(listaDesordenada) {
  const listaOrdenada = ordenarLista(listaDesordenada);
  const moda = {};

  for (lista of listaOrdenada) {
    if (!moda[lista]) {
      moda[lista] = {};
      moda[lista] = 0;
    }
    moda[lista] += 1;
  }

  const modaOrdenada = ordenarListaBidimensional(Object.entries(moda));
  //console.log(modaOrdenada);
  //console.log(modaOrdenada[modaOrdenada.length-1][1]);

  return modaOrdenada[modaOrdenada.length - 1][1];
}

let myChart ;

function chart(propiedades, propiedad, destroy) {
  console.log({ propiedad });

  const label = Object.keys(propiedades);
  const datos = Object.values(propiedades);
  const ctx = document.getElementById("myChart").getContext("2d");

  const data = {
    labels: label,
    datasets: [
      {
        label: "My First Dataset",
        data: datos,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
          "rgb(542, 12, 25)",
          "rgb(423, 2, 235)",
          "rgb(522, 222, 25)",
          "rgb(432, 22, 25)",
          "rgb(22, 222, 25)",
        ],
      },
    ],
  };

  if (myChart) {
    myChart.destroy();
  }


  myChart = new Chart(ctx, {
    type: "polarArea",
    data: data,
    options: {},
  });
}
