function disabledRadios(checkedRadio) {
  var radios = document.getElementsByName(checkedRadio.name);
  for (var i = 0; i < radios.length; i++) {
    if (radios[i] !== checkedRadio) {
      radios[i].disabled = checkedRadio.checked;
    }
  }
}
