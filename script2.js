const sendForm = () =>{

    const loadMessage = 'загрузка',
          errorMessage = 'что то пошло не так',
          successMessage = 'ваше сообщение отправлено';
   
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size:2rem;color:#fff;';
   
  
  const forms = document.querySelectorAll('form');
      let invalidFields = new Map();//создаем объект
  
      const validate = input => {
          const parent = input.closest('form');
  
          const enter = parent.querySelector('.form-btn');
  
          const rules = {
              user_name: {
                  pattern: new RegExp('[а-яё ]', 'ig')
              },
              user_email: {
                  pattern: new RegExp('[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}', 'igm'),
              },
              user_phone: {
                  pattern: new RegExp('(\\+7|8){1,2}[0-9]{10}', 'ig')
              },
              user_message: {
                  pattern: new RegExp('[а-яё ]', 'ig')
              }
          };
  
          if(!input.value.match(rules[input.name].pattern)) {
           
            input.style.cssText = `border: 3px solid red;`;
              invalidFields.set(input.name, input.value);   
          } else {
              input.style.cssText = `border: 3px solid green;`;
              invalidFields.delete(input.name);
          }
  
          if(input.value === '') {
              input.style.cssText = `border: none`;
          }
  
          if(invalidFields.size === 0) {
              enter.disabled = false;
              //навешать обработчик события на кнопку "отправить заявку" и дальше функция отправки формы
  //перебирем массив форм и вешаем событие
  
  forms.forEach((item, i)=> {
  
  
    forms[i].addEventListener('submit', (event) =>{
      event.preventDefault();
      forms[i].appendChild(statusMessage);

    let  inputs = forms[i].querySelectorAll('input');
  
  //очистка формы 
      const clear =  () =>{inputs.forEach((item, i) => {
        inputs[i].value='';});
         };
  // получаем данные с формы
      const formData = new FormData(forms[i]);
      
      let body = {};
  
      formData.forEach((val, key) =>{
        body[key]=val;
             
       });
      
    statusMessage.textContent = loadMessage;
  
  
   
    if(invalidFields.size  !== 0) {
      statusMessage.textContent = errorMessage;
      clear();
  
      }else{
     
      //вызываем функцию передачи данных  на сервер (она ниже)
     postData(body)
      .then(() =>{statusMessage.textContent = successMessage; })
      .catch((error)=> {statusMessage.textContent = errorMessage;console.log('error');});
     
      clear();
    
    }
  
    });
    
  //сама функция
  const postData =(body) =>{
  
  return new Promise((resolve, redject) =>{
    
  const request = new XMLHttpRequest();
    
  
      request.addEventListener('readystatechange', ()=>{
  
        if(request.readyState !==4){
            return;
        } if(request.status === 200){
            resolve();
           } else{
          redject(request.status);
            }
      });
    
    
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
      
      });
      
      };
  
  }//end forEach
  
  );//end forEach*/
  
  
          } else {
              enter.disabled = true;
          }
  
          
      };
  
      forms.forEach(form => {
          form.addEventListener('input', e => {
              validate(e.target);

            });
      });
  
     } ;
     sendForm(); 
  
  