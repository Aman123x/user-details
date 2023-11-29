const name=document.getElementById("name");
const email=document.getElementById("email");
const phone=document.getElementById("phone");
const form=document.getElementById("myForm");
const detail=document.getElementById("detail");
let editingDataId = null;

form.addEventListener("submit",function(e){
    e.preventDefault();
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;


    let formData={
        name:name,
        email:email,
        phone:phone
    }

    if(editingDataId){
        axios.put(`https://crudcrud.com/api/316f8873564b416f87dce2102a4bfc74/formDataa/${editingDataId}`,formData)
        .then((response)=>{
            console.log("Data updated successfully");
            editingDataId=null;
            form.reset();
            location.reload();
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        axios.post("https://crudcrud.com/api/316f8873564b416f87dce2102a4bfc74/formDataa",formData)
        .then((response)=>{
            const storedData=response.data;
            displayData(storedData);
            //console.log(storedData);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    
});

function displayData(storedData){
    const name=document.getElementById("name");
    
    let list=document.createElement("li");

    let edit=document.createElement("button");
    edit.textContent="Edit";
    edit.style.margin="10px";

    let del=document.createElement("button");
    del.textContent="Delete";

    list.innerHTML=`Name: ${storedData.name} &nbsp&nbsp Email: ${storedData.email} &nbsp&nbsp   Phone: ${storedData.phone}`;

    list.appendChild(edit);

    list.appendChild(del);

    detail.appendChild(list);

    del.addEventListener("click",function(){
        axios.delete(`https://crudcrud.com/api/316f8873564b416f87dce2102a4bfc74/formDataa/${storedData._id}`)
        .then((response)=>{
            console.log("Data deleted successfully");
        })
        .catch((err)=>{
            console.log(err);
        });
        detail.removeChild(list);
    })


    edit.addEventListener("click",function(){
        editingDataId=storedData._id;

        document.getElementById("name").value = storedData.name;
        document.getElementById("email").value = storedData.email;
        document.getElementById("phone").value = storedData.phone;

        //detail.removeChild(list);
        
    })

    name.value = "";
    email.value = "";
    phone.value = "";
}

window.addEventListener("DOMContentLoaded",function(){
    axios.get("https://crudcrud.com/api/316f8873564b416f87dce2102a4bfc74/formDataa")
    .then((response)=>{
        for(let i=0;i<response.data.length;i++){
            const storedData=response.data[i];
            displayData(storedData);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})





