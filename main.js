// Get element by id //

const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');



//Regular Expresions//

const expresions = {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, 
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	password: /^.{4,12}$/, 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ 
};

// Initial Status fields //

const fields = {
	user : false,
	name : false,
	password : false,
	email : false,
	phone : false,	
}



// Function by Validate input

const validateForm = (e)=>{
    switch (e.target.name) {
		case 'user':
			validateInput(expresions.user,e.target,'user')			
		break;

		case 'name':
			validateInput(expresions.name,e.target,'name')	
		break;

		case 'password':
			validateInput(expresions.password,e.target,'password')
			validatePassword()			
		break;

		case 'password2':
			validatePassword()
		break;

		case 'email':
			validateInput(expresions.email,e.target,'email')
		break;

		case 'phone':
			validateInput(expresions.phone,e.target,'phone')
		break;
	}
};


// Function Validate expresions
	/* Factorize code if in a function with 3 parameters  */

const validateInput = (expresion, input, field)=>{

	if (expresion.test(input.value)){
		document.getElementById(`form__${field}`).classList.remove('form__group-wrong');
		document.getElementById(`form__${field}`).classList.add('form__group-right');
		document.querySelector(`#form__${field} i`).classList.remove('fa-times-circle');
		document.querySelector(`#form__${field} i`).classList.add('fa-check-circle');
		document.querySelector(`#form__${field} .form__input-error`).classList.remove('form__input-error-active');
		fields[field] = true;

	}else {
		document.getElementById(`form__${field}`).classList.add('form__group-wrong');
		document.querySelector(`#form__${field} i`).classList.remove('fa-check-circle');
		document.querySelector(`#form__${field} i`).classList.add('fa-times-circle');
		document.getElementById(`form__${field}`).classList.remove('form__group-right');
		document.querySelector(`#form__${field} .form__input-error`).classList.add('form__input-error-active');
		fields[field] = false;
	}

};

// Function to validate password

const validatePassword = ()=>{
	const password = document.getElementById('password');
	const password2 = document.getElementById('password2');
	if (password.value !== password2.value){
		document.getElementById(`form__password2`).classList.add('form__group-wrong');
		document.querySelector(`#form__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#form__password2 i`).classList.add('fa-times-circle');
		document.getElementById(`form__password2`).classList.remove('form__group-right');
		document.querySelector(`#form__password2 .form__input-error`).classList.add('form__input-error-active');
		fields['password'] = false;

	}else{
		document.getElementById(`form__password2`).classList.remove('form__group-wrong');
		document.getElementById(`form__password2`).classList.add('form__group-right');
		document.querySelector(`#form__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#form__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#form__password2 .form__input-error`).classList.remove('form__input-error-active');
		fields['password'] = true;
	}

};

//Validate Inputs

inputs.forEach((input)=>{
    input.addEventListener('keyup',validateForm);
    input.addEventListener('blur',validateForm);

});


//prevent default //

form.addEventListener('submit', (e)=> {
    e.preventDefault();

	const terms = document.getElementById('terms')

	// compare Validate inputs

	if (fields.user && fields.name && fields.password && fields.email && fields.phone && terms.checked){
		form.reset();

		// Activate message of successufull

		document.getElementById('form__message-succesufull').classList.add('form__message-succesufull-active')
		setTimeout(()=>{

			// show message form sended succesufull

			document.getElementById('form__message-succesufull').classList.remove('form__message-succesufull-active')
		},2000)

			// remove icon check 

		document.querySelectorAll('form__group-right').forEach((i)=>{
			i.classList.remove('form__group-right')
		})

	} else {
		document.getElementById('form__message').classList.add('form__message-active')
	}
});