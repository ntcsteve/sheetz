let sheetz;
const sheetzListUI = document.querySelector('.sheetz-output');
const sheetzNameUI = document.querySelector('#taskName');
const sheetzAmountUI = document.querySelector('#taskTime');
const sheetzSubmitUI = document.querySelector('#btnSubmit');

// Load all event listeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getSheetz);
  sheetzSubmitUI.addEventListener('click', addSheetz);
  sheetzListUI.addEventListener('click', deleteSheetz);
}

getSheetz = () => {
  localStorage.getItem('sheetz')
    ? ((sheetz = JSON.parse(localStorage.getItem('sheetz'))), displaySheetz())
    : (sheetz = []);
};

addSheetz = () => {
  let taskNameValue = sheetzNameUI.value;
  let taskAmountNumber = sheetzAmountUI.valueAsNumber;

  taskNameValue !== '' && isNaN(taskAmountNumber) !== true
    ? (sheetz.push({
        taskName: taskNameValue,
        taskTime: taskAmountNumber,
      }),
      localStorage.setItem('sheetz', JSON.stringify(sheetz)),
      getSheetz(),
      displaySheetz(),
      clearSheetz())
    : alert('Add a task and the amount of time spend'),
    clearSheetz();
};

deleteSheetz = (event) => {
  // console.log('target > ', event.target);
  // if (event.target.parentElement.classList.contains('delete-item')) {
  //   event.target.parentElement.parentElement.remove();
  // } else {
  //   return;
  // }

  let index = event.target.id.split('-').pop();
  let sheets = JSON.parse(localStorage.getItem('sheetz'));
  sheets.splice(index, 1);
  localStorage.setItem('sheetz', JSON.stringify(sheets));
  getSheetz();
  displaySheetz();
};

displaySheetz = () => {
  let sheets = JSON.parse(localStorage.getItem('sheetz'));
  sheetzListUI.innerHTML = '';

  sheets.forEach(function (sheets, index) {
    let li = document.createElement('li');
    li.className = 'sheetz-item';
    li.id = 'sheets-' + index;
    li.appendChild(document.createTextNode(sheets.taskName + ' ' + sheets.taskTime + ' mins'));

    let link = document.createElement('a');
    link.className = 'delete-item';
    link.id = 'sheets-' + index;
    link.innerHTML = '<i class="fas fa-minus-circle fa-lg"></i>';
    li.appendChild(link);

    sheetzListUI.appendChild(li);
  });
};

clearSheetz = () => {
  sheetzNameUI.value = '';
  sheetzAmountUI.value = '';
};

clearAll = () => {
  localStorage.removeItem('sheetz');
};

// let sheetz;
// localStorage.getItem('sheetz')
//   ? ((sheetz = JSON.parse(localStorage.getItem('sheetz'))), displaySheetz())
//   : (sheetz = []);

loadEventListeners();
