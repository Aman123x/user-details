const name=document.getElementById("name");
const email=document.getElementById("email");
const phone=document.getElementById("phone");
const form=document.getElementById("myForm");
const detail=document.getElementById("detail");


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

    axios.post("https://crudcrud.com/api/385c111531e04118bfe88dcc769fc5d0/formDataa",formData)
    .then((response)=>{
        const storedData=response.data;
        displayData(storedData);
        //console.log(storedData);
    })
    .catch((err)=>{
        console.log(err);
    })
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
        detail.removeChild(list);
    })

    // let nameValue = name.value;
    // let emailValue = email.value;
    // let phoneValue = phone.value;

    // edit.addEventListener("click",function(){
    //     name.value=nameValue;
    //     email.value=emailValue;
    //     phone.value=phoneValue;

    //     detail.removeChild(list);
        
    // })

    name.value = "";
    email.value = "";
    phone.value = "";
}

window.addEventListener("DOMContentLoaded",function(){
    axios.get("https://crudcrud.com/api/385c111531e04118bfe88dcc769fc5d0/formDataa")
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





