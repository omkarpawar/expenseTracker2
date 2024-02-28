function submitUserDetails(event){
    event.preventDefault();

    const todoDetails={

        todoName : event.target.todoName.value,
        todoDescription : event.target.todoDescription.value,
        taskDone:false
    }
    console.log(todoDetails);
    axios
        .post(`
        
        https://crudcrud.com/api/20633798821a4b19902b162282b9608f/todoDetails/
        
        `,todoDetails)
         .then((res)=>{
            displayOnScreen(res.data)
         })
         .catch((err)=>{
            console.log(err)
         })
}

window.addEventListener('DOMContentLoaded',function(event){

    axios
        .get(`

        https://crudcrud.com/api/20633798821a4b19902b162282b9608f/todoDetails/
        
        `)
        .then((res)=>{

            for(var i=0;i<res.data.length;i++){
                displayOnScreen(res.data[i]);
            }
        })

})

function displayOnScreen(todoDetails){


    const listItem=document.createElement('li');
    listItem.setAttribute('class','list-group-item font-monospace')
    listItem.appendChild(document.createTextNode(`

       || TASK NAME : ${todoDetails.todoName} ||                
       ||DESCRIPTION : ${todoDetails.todoDescription} ||
    
    `))

    const unorderdList=document.querySelector('ul');
    unorderdList.setAttribute('class','list-group list-group')
    unorderdList.appendChild(listItem);


    const doneBtn=document.createElement('button');
    doneBtn.style.marginLeft="900px";
    doneBtn.setAttribute('class','btn btn-outline-dark');
    doneBtn.appendChild(document.createTextNode('✔️'));
    listItem.appendChild(doneBtn);

    const deleteBtn=document.createElement('button')
    deleteBtn.style.marginLeft="5px";
    deleteBtn.setAttribute('class','btn btn-outline-dark');
    deleteBtn.appendChild(document.createTextNode('❌'));
    listItem.appendChild(deleteBtn);

    doneBtn.addEventListener('click',function(event){
        const taskid=todoDetails._id;
        axios
            .delete(`
            
            https://crudcrud.com/api/20633798821a4b19902b162282b9608f/todoDetails/${taskid}

            `)
            .then((res)=>{
                todoDetails.taskDone=true;
                if(todoDetails.taskDone===true){
                    unorderdList.removeChild(listItem)
                    displayOnTodoDone(todoDetails);
                  
                }
                            
            })
            .catch((err)=>{
                console.log(err);
            })

    })

    deleteBtn.addEventListener('click',function(event){
        const taskid2=todoDetails._id;

        axios
            .delete(`
            
            https://crudcrud.com/api/20633798821a4b19902b162282b9608f/todoDetails/${taskid2}

            `)
            .then((res)=>{
                unorderdList.removeChild(listItem);
            })
            .catch((err)=>{
                console.log(err);
            })



    })

}
function displayOnTodoDone(todoDetails){

    
    const listItem=document.createElement('li');
    listItem.setAttribute('class','list-group-item font-monospace')
    listItem.appendChild(document.createTextNode(`

        ${todoDetails.todoName}
        ${todoDetails.todoDescription} 

    
    `))

    const unorderdList=document.getElementById('tDone');
    unorderdList.setAttribute('class','list-group list-group')
    unorderdList.appendChild(listItem);


}

  