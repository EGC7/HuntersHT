function enableContactMask(){
  const contactInput = document.querySelector("#contactInput");

  contactInput.addEventListener('input', (e) => {
      let value = e.target.value;

      value = value.replace(/\D/g, '');

      if(value.length > 0){
          value = `(${value}`;
      }

      if (value.length > 3) {
        value = `${value.slice(0, 3)}) ${value.slice(3)}`;
      }

      
      if (value.length >= 10) {
        if (value.replace(/\D/g, '').length >= 11) {
          
          value = `${value.slice(0, 10)}-${value.slice(10, 15)}`;
        } else {
          value = `${value.slice(0, 9)}-${value.slice(9, 13)}`;
        }
      }

      
      if (value.length > 15) {
        value = value.slice(0, 15);
      }

      e.target.value = value;
  })
}

export { enableContactMask };