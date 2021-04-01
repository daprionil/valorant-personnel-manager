//Variables
const formularioAddPeople = document.querySelector('#formAddPeople');
const boxPeoples = document.querySelector('#boxPeoples');

let data = {
    name:'',
    email:'',
    idPeople:'',
    typePeople:'',
    fecha:'',
    img:'',
    id: '',
    date:'',
};

class Personas{
    constructor(){
        this.peoples = [];
        this.mode = false;
    };
    agregarPeople(obj){
        this.peoples = [...this.peoples,obj];
    };
    deletePeople(obj){
        this.peoples = this.peoples.filter( pe => pe.id !== obj.id );
    };
    editarPeople(obj){
        this.peoples = this.peoples.map( pe => {
            if(pe.id === obj.id){
                pe = obj;
                return pe;
            }else{
                return pe;
            };
        });
    };
};
class UI {
    message(text,type){
        const boxBody = document.querySelector('body');

        this.deleteMessage(boxBody);

        const div = document.createElement('div');
        div.classList.add('message');
        div.textContent = text;
        if(type === 'incorrecto'){
            div.classList.add('incorrecto');
        }else{
            div.classList.add('correcto');
        };
        
        boxBody.insertBefore(div,boxBody.firstChild);
        setTimeout( ()=>{
            this.deleteMessage(boxBody);
        },3000);
    };
    deleteMessage(b){
        while(b.querySelector('.message')){
            b.removeChild(b.querySelector('.message'));
        };
    };
    viewResults(arr){
        let clientes = [];
        let empleados = [];
        let contratos = [];

        arr.forEach( pe => {
            switch(pe.typePeople){
                case "cliente":
                    clientes = [...clientes,pe];
                    break;
                case "empleado":
                    empleados = [...empleados,pe];
                    break;
                case "contrato":
                    contratos = [...contratos,pe];
                    break;
                default:
                    break;
            };
        });

        document.querySelector('#statisticsPeoples').innerHTML = `<span>${arr.length}</span>`;
        document.querySelector('#cStatistics').innerHTML = `<span>Clientes: </span>${clientes.length}`;
        document.querySelector('#eStatistics').innerHTML = `<span>Empleados: </span>${empleados.length}`;
        document.querySelector('#ccStatistics').innerHTML = `<span>Contratados: </span>${contratos.length}`;
    };
    peoplesHtml(obj){
        this.deleteHtmlPeoples();
        if(obj.length > 0){
            obj.forEach( pe => {
                boxPeoples.insertBefore(objHtmlPeople(pe),boxPeoples.firstChild);
            });
            return;
        };
        const divMessage = document.createElement('h2');
        divMessage.textContent = "No hay Personas Para Mostrar";
        divMessage.style.textAlign = 'center';
        boxPeoples.appendChild(divMessage);
    };
    deleteHtmlPeoples(){
        while(boxPeoples.firstChild){
            boxPeoples.removeChild(boxPeoples.firstChild);
        };
    };
};
const ui = new UI();
const p = new Personas();
//Eventos
addEventListeners();
function addEventListeners(){
    document.addEventListener('DOMContentLoaded', ()=> {
        uiControl.uiControl();
        uiControl.controlFecha();
        p.peoples = JSON.parse(localStorage.getItem('peoples')) || [];
        formularioAddPeople.addEventListener('submit', agregarPersona);
        ui.peoplesHtml(p.peoples);
        ui.viewResults(p.peoples);
    });
};
//Funciones
function agregarPersona(e){
    e.preventDefault();

    const name = formularioAddPeople.querySelector('#namePeople').value;
    const email = formularioAddPeople.querySelector('#emailPeople').value;
    const idPeople = Number(formularioAddPeople.querySelector('#idPeople').value);
    const typePeople = formularioAddPeople.querySelector('#typePeople').value;

    const day = formularioAddPeople.querySelector('#dayOldPeople').value;
    const month = formularioAddPeople.querySelector('#monthOldPeople').value;
    const year = formularioAddPeople.querySelector('#yearOldPeople').value;
    
    const numberRandom = Math.ceil(Math.random()*16);

    const fecha = {day,month,year};

    if(name === '' || email === '' || idPeople < 0 || day === '' || month === '' || year === '' || typePeople === ''){
        ui.message('Debes Completar Todos los campos','incorrecto');
        return;
    };
    if(!p.mode){
        data = {
            name,
            email,
            idPeople,
            typePeople,
            fecha,
            img:numberRandom,
            id: generateUUID(),
            date: dayjs(new Date()).format('MMMM D YYYY - h : mm a'),
        };

        p.agregarPeople({...data});
        setStoragePeople(p.peoples);
        ui.viewResults(p.peoples);
        ui.peoplesHtml(p.peoples);
        ui.message('Persona Agregada Correctamente','correcto');
        formularioAddPeople.reset();
        resetObj();
        if(ventanaAddPeople.classList.contains('active')){
            ventanaAddPeople.classList.remove('active');
        };

    }else{
        data.name = name;
        data.email = email;
        data.idPeople = idPeople;
        data.typePeople = typePeople;
        data.fecha = fecha;
        data.date = dayjs(new Date()).format('MMMM D YYYY - h : mm a');

        p.editarPeople({...data});
        setStoragePeople(p.peoples);

        ui.viewResults(p.peoples);
        ui.peoplesHtml(p.peoples);
        ui.message('Editado Correctamente','correcto');

        formularioAddPeople.querySelector('button[type="submit"]').textContent = 'Confirmar';
        formularioAddPeople.reset();

        resetObj();
        
        if(ventanaAddPeople.classList.contains('active')){
            ventanaAddPeople.classList.remove('active');
        };
        p.mode = false;
    };
};
function resetObj(){
    data = {
        name:'',
        email:'',
        idPeople:'',
        typePeople:'',
        fecha:'',
        img:'',
        id: '',
        date:'',
    };
};
function objHtmlPeople(obj){
    const {name,email,idPeople,typePeople,fecha,date,img} = obj;
    
    const divBoxParent = document.createElement('div');
    divBoxParent.classList.add('ctn-item-people');

    const imgBox = document.createElement('div');
    imgBox.classList.add('img-people');

    imgBox.innerHTML = `<img src="img/iconsPeoples/imagen${img}.png"><p style="border-bottom:1px solid #1b1717;padding:5px;">${name}</p>`;

    const descripBox = document.createElement('div');
    descripBox.classList.add('descrip-people');
    descripBox.innerHTML = `<p><span style="font-weight:800;">Nacimiento: </span> ${fecha.day} | ${fecha.month} | ${fecha.year}</p>
    <p><span style="font-weight:800;">Email: </span> ${email}</p>
    <p><span style="font-weight:800;">Identificación: </span>${idPeople}</p>
    <p><span style="font-weight:800;">Tipo de Persona: </span>${typePeople}</p>
    <p><span style="font-weight:800;">Agregado el: </span> ${date}</p>`;

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-delete-people','btn');
    btnDelete.textContent = '❌';
    btnDelete.onclick = ()=>{
        eliminarPersona(obj);
    };

    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Editar ✏️';
    btnEdit.classList.add('btn','btn-edit-people');
    btnEdit.onclick = () => {
        editarPeople(obj);
    };

    divBoxParent.appendChild(imgBox);
    divBoxParent.appendChild(descripBox);
    divBoxParent.appendChild(btnDelete);
    divBoxParent.appendChild(btnEdit);

    return divBoxParent;
};
function editarPeople(obj){
    p.mode = true;
    const {name,email,idPeople,typePeople,fecha,img,id,date} = obj;

    formularioAddPeople.querySelector('button[type="submit"]').textContent = 'Confirmar Edición';
    
    formularioAddPeople.querySelector('#namePeople').value = name;
    formularioAddPeople.querySelector('#emailPeople').value = email;
    formularioAddPeople.querySelector('#idPeople').value = idPeople;

    formularioAddPeople.querySelector('#dayOldPeople').value = fecha.day;
    formularioAddPeople.querySelector('#monthOldPeople').value = fecha.month;
    formularioAddPeople.querySelector('#yearOldPeople').value = fecha.year;
    formularioAddPeople.querySelector('#typePeople').value = typePeople;

    data = {
        name,
        email,
        idPeople,
        typePeople,
        fecha,
        img,
        id,
        date,
    };

    if(!ventanaAddPeople.classList.contains('active')){
        ventanaAddPeople.classList.add('active');
    };
};
function eliminarPersona(obj){
    p.deletePeople(obj);
    setStoragePeople(p.peoples);
    ui.peoplesHtml(p.peoples);
    ui.message('Eliminado Correctamente','correcto');
    ui.viewResults(p.peoples);
};
function setStoragePeople(arr){
    localStorage.setItem('peoples',JSON.stringify(arr));
    arr = JSON.parse(localStorage.getItem('peoples'));
};
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};