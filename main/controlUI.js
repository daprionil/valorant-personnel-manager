//Variables
const ventanaAddPeople = document.querySelector('.ctn-people-form');
const btnAddPeople = document.querySelector('#btnAddPeople');
//Funciones
class UIControl{
    uiControl(){
        ventanaAddPeople.addEventListener('click',(e) => {
            if(e.target.classList.contains('ctn-people-form')){
                if(ventanaAddPeople.classList.contains('active')){
                    ventanaAddPeople.classList.remove('active');
                };
            };
        });
        btnAddPeople.addEventListener('click',(e) => {
            e.preventDefault();
            if(!ventanaAddPeople.classList.contains('active')){
                ventanaAddPeople.classList.add('active');
            };
        });
    };
    controlFecha(){
        this.controlDay();
        this.controlMonth();
        this.controlYear();
    };
    controlMonth(){
        const monthSelect = document.querySelector('#monthOldPeople');
        let meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        for(let i = 0; i < meses.length; i++){
            const option = document.createElement('option');
            option.value = meses[i];
            option.textContent = meses[i];
            monthSelect.appendChild(option);
        };
    };
    controlDay(){
        const daySelect = document.querySelector('#dayOldPeople');
        for(let i = 0; i <= 31; i++){
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        };
    };
    controlYear(){
        const yearSelect = document.querySelector('#yearOldPeople');
        let max = new Date().getFullYear() - 15;
        let min = max - 100;
        for(let i = max; i >= min; i--){
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        };
    };
};
const uiControl = new UIControl();