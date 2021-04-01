let locationSearchString = location.search.substring(1);
const locationSearchTable = locationSearchString.split('/');
const inputsAll = document.querySelectorAll('.filter input')

if(locationSearchTable[0].toLocaleLowerCase() === 'mezczyzni'){
    locationSearchTable[0] = 'Mężczyźni';
}

for(let i = 0; i < locationSearchTable.length; i++){
    for(let j = 0; j < inputsAll.length; j++){
        if(inputsAll[j].defaultValue.toLocaleLowerCase() === locationSearchTable[i].toLocaleLowerCase()){
            inputsAll[j].checked = true;
        }
    }
}