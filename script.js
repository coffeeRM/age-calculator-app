function isValidDate(dia, mes, ano) {
  const data = new Date(ano, mes - 1, dia);
  return (
    data.getDate() === dia &&
    data.getMonth() === mes - 1 &&
    data.getFullYear() === ano
  );
}

function validarCamposPreenchidos(dia, mes, ano) {
  const errorDia = document.querySelector('.input-container:nth-child(1) .error-message');
  const errorMes = document.querySelector('.input-container:nth-child(2) .error-message');
  const errorAno = document.querySelector('.input-container:nth-child(3) .error-message');
  const inputDia = document.querySelector('.input-container:nth-child(1) .input');
  const inputMes = document.querySelector('.input-container:nth-child(2) .input');
  const inputAno = document.querySelector('.input-container:nth-child(3) .input');
  const labelDia = document.querySelector('.input-container:nth-child(1) .label');
  const labelMes = document.querySelector('.input-container:nth-child(2) .label');
  const labelAno = document.querySelector('.input-container:nth-child(3) .label');
  const linha = document.querySelector('.linha');
  const dataNascimento = new Date(ano, mes - 1, dia);
  const dataAtual = new Date();


  inputDia.classList.remove('error');
  labelDia.classList.remove('error');
  linha.classList.remove('error');
  inputMes.classList.remove('error');
  labelMes.classList.remove('error');
  inputAno.classList.remove('error');
  labelAno.classList.remove('error');

  if (dia === "") {
    errorDia.textContent = "This field is required";
    inputDia.classList.add('error');
    labelDia.classList.add('error');
    linha.classList.add('error');
  } else {
    errorDia.textContent = "";
  }

  if (mes === "") {
    errorMes.textContent = "This field is required";
    inputMes.classList.add('error');
    labelMes.classList.add('error');
    linha.classList.add('error');
  } else {
    errorMes.textContent = "";
  }

  if (ano === "") {
    errorAno.textContent = "This field is required";
    inputAno.classList.add('error');
    labelAno.classList.add('error');
    linha.classList.add('error');
  } else {
    errorAno.textContent = "";
  }

  if (dia !== "" && mes !== "" && ano !== "") {
    if (!validarDataValida(dia, mes, ano)) {
      errorDia.textContent = "must be a valid day";
      inputDia.classList.add('error');
      labelDia.classList.add('error');
      linha.classList.add('error');
    }

    if (isNaN(mes) || mes < 1 || mes > 12) {
      errorMes.textContent = "must be a valid month";
      inputMes.classList.add('error');
      labelMes.classList.add('error');
      linha.classList.add('error');
    }

    if (isNaN(ano) || ano >= dataAtual.getFullYear()) {
      errorAno.textContent = "must be in the past";
      inputAno.classList.add('error');
      labelAno.classList.add('error');
      linha.classList.add('error');
    }
  }

  return dia !== "" && mes !== "" && ano !== "";
}

function validarDataValida(dia, mes, ano) {
  const diasNoMes = new Date(ano, mes, 0).getDate();

  if (dia < 1 || dia > diasNoMes) {
    return false;
  }

  if (mes === 2 && dia === 29 && (ano % 4 !== 0 || (ano % 100 === 0 && ano % 400 !== 0))) {
    return false;
  }

  return true;
}

function calcularIdade() {
  const dia = document.querySelector('.input-container:nth-child(1) .input').value.trim();
  const mes = document.querySelector('.input-container:nth-child(2) .input').value.trim();
  const ano = document.querySelector('.input-container:nth-child(3) .input').value.trim();

  validarCamposPreenchidos(dia, mes, ano);
  
  const dataNascimento = new Date(ano, mes - 1, dia);
  const dataAtual = new Date();
  
  let idadeEmAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();
  const mesAtual = dataAtual.getMonth();
  const diaAtual = dataAtual.getDate();
  
  if (mesAtual < dataNascimento.getMonth() || (mesAtual === dataNascimento.getMonth() && diaAtual < dataNascimento.getDate())) {
    idadeEmAnos--;
  }
  
  const ultimoAniversario = new Date(dataAtual.getFullYear(), dataNascimento.getMonth(), dataNascimento.getDate());
  if (dataAtual < ultimoAniversario) {
    ultimoAniversario.setFullYear(ultimoAniversario.getFullYear() - 1);
  }

  const diferencaMeses = (dataAtual.getFullYear() - ultimoAniversario.getFullYear()) * 12 + (dataAtual.getMonth() - ultimoAniversario.getMonth());
  const idadeEmMeses = diaAtual >= dataNascimento.getDate() ? diferencaMeses : diferencaMeses - 1;

  const idadeEmDias = Math.floor((dataAtual - ultimoAniversario) / (1000 * 60 * 60 * 24));
  
  exibirResultado(idadeEmAnos, idadeEmMeses, idadeEmDias);
}

function exibirResultado(idadeEmAnos, idadeEmMeses, idadeEmDias) {
  const resultadoYearsElement = document.querySelector('.resultado-years');
  const resultadoMonthsElement = document.querySelector('.resultado-months');
  const resultadoDaysElement = document.querySelector('.resultado-days');

  resultadoYearsElement.textContent = idadeEmAnos !== 0 ? idadeEmAnos : "--";
  resultadoMonthsElement.textContent = idadeEmMeses !== 0 ? idadeEmMeses : "--";
  resultadoDaysElement.textContent = idadeEmDias !== 0 ? idadeEmDias : "--";
}

document.querySelector('.imagem-container img').addEventListener('click', calcularIdade);
