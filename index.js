let disPortal =document.getElementsByClassName("discussionPortal")[0];
let obj=[];
let arr=[]
//console.log(disPortal)
//Array for the localStorage

window.addEventListener("load",()=>{
  if(JSON.parse(localStorage.getItem("i"))==undefined){
     localStorage.setItem("i",JSON.stringify(0));
  }
 
  // tArea.innerHTML=''
  displayLocalStorage();
  QuestionScreen();
})

//give the parsed value of the variable i
function getI(){
  return JSON.parse(localStorage.getItem("i"));
}

function QuestionScreen(){
    disPortal.innerHTML=`<h1 id="QuestionFormHeading">Welcome to Discussion Portal</h1>
    <p id="QuestionFormParagraph">Enter the subject and question to get started</p>
    <div>
    <input type="text" id="QuestionFormInput" placeholder="subject">
    </div>
    <div>
    <textarea id="QuestionFormTextArea" rows="10" cols="50" placeholder="Question"></textarea>
    </div>
    </form>
    <button type="button" id="QuestionFormButton" onclick="SaveQuestionToLocalStorage()">Submit</button>`
    
}

function displayLocalStorage(){
    let LowerQuestionContainer=document.getElementsByClassName("lowerQuestionForm")[0];
    LowerQuestionContainer.innerHTML='';
    if(JSON.parse(localStorage.getItem("item"))!=undefined){
   let arrayLocalStorage=JSON.parse(localStorage.getItem("item"));
   
         arrayLocalStorage.forEach(function(value){
         // console.log(value)
          let myDiv=document.createElement("div");
          myDiv.setAttribute("id",`${value.id}`);
          myDiv.setAttribute("class","myDiv")
          myDiv.innerHTML=`<button type="button" id="btn${value.id}" class="QuestionsButton" onclick="AddResponsePage(btn${value.id})">
          <h1 class="QuestionsHeading">${value.topic}</h1>
          <p class="QuestionsParagraph">${value.question}</p>
         
          </button>
        <div><img src=${(value.favourites)?"fillStar.png":'emptyStar.png'} id="img${value.id}" class="star" onclick="AddToFavourites('${value.id}')" alt="chalNikal"><div>`
        
          LowerQuestionContainer.appendChild(myDiv);

         })
       
    }
}

function getValue(event){

  //if key is an enter then storing the element to the local storage
  if(event.keyCode==13){
    // localStorage.setItem(JSON.stringify(tArea.value));
    // addToList();
    if(tArea.value.trim()!=''){
     addToLocalStorage();
     //adding the element on the web page
    // addToList();
     
      //incrementing the value of i
       let x=JSON.parse(localStorage.getItem("i"));
       x++;
       localStorage.setItem("i",JSON.stringify(x)); 
    }
    tArea.value='' 
    
    tArea.blur();
    tArea.focus();
  }
}
function SaveQuestionToLocalStorage(){
  let QuestionFormInput=document.getElementById("QuestionFormInput");
  let QuestionFormTextArea=document.getElementById("QuestionFormTextArea");
  let tValue=QuestionFormInput.value.trim();
  let tValue2=QuestionFormTextArea.value.trim();
    if(JSON.parse(localStorage.getItem("item"))==undefined){
      obj=[]
      let it= {id:getI(),topic: tValue,question:tValue2, Responses: [],favourites:false};
      obj.push(it)
      localStorage.setItem("item",JSON.stringify(obj));
    }
    else {
          obj=JSON.parse(localStorage.getItem("item"));
          let it={id:getI(),topic: tValue,question:tValue2, Responses: [],favourites:false};
          obj.push(it);
          localStorage.setItem("item",JSON.stringify(obj));

    }
   // displayLocalStorage();
      displayQuestion(tValue,tValue2);
      let x=JSON.parse(localStorage.getItem("i"));
      x++;
      localStorage.setItem("i",JSON.stringify(x)); 
    }
  //  console.log(localStorage.getItem("item1"))
   // console.log(subject,question);



function displayQuestion(tValue,tValue2){
   
   // console.log("Printing the local"+local);
    let LowerQuestionContainer=document.getElementsByClassName("lowerQuestionForm")[0];
   // upperQuestionContainer.innerHTML='';
    // local.forEach(function(value){
       // console.log(value)
        let myDiv=document.createElement("div");
        myDiv.setAttribute("id",`${getI()}`);
        myDiv.setAttribute("class","myDiv")
        myDiv.innerHTML=`<button type="button" id="btn${getI()}" class="QuestionsButton" onclick=AddResponsePage(btn${getI()})>
        <h1 class="QuestionsHeading">${tValue}</h1>
        <p class="QuestionsParagraph">${tValue2}</p>
        
        </button>
        <div><img src="emptyStar.png" id="img${getI()}" class="star" onclick="AddToFavourites('${getI()}')" alt="chalNikal"><div>`
        LowerQuestionContainer.appendChild(myDiv);
    // })
    
    
}
function AddResponsePage(val1){
  
  console.log(val1)
  let val2=val1.id.substring(3);
  console.log(val2)
 
 // console.log("Printing the value of "+val2)
  let children=val1.children;
  console.log(children[0].innerHTML)
  disPortal.innerHTML=''

  let myDiv=document.createElement('div');
 

  myDiv.innerHTML=`<h1>Question</h1>
  <div class="Question" style="background-color: gray;">
       <h1>${children[0].innerText}</h1>
       <h3>${children[1].innerText}</h3>

  </div>
       <button onclick="ResolveTheQuestion(${val2})">Resolve</button>
   <div>
   <div id="AddResponses"></div>
       <div>
          <label for="name">Name:</label>
       </div>
       <div>
          <input type="text" id="name" >
       </div>
       <div>
          <label for="Response">Add Response:</label>
       </div>
       <div>
          <textarea id="Response" placeholder="Enter your Response here"></textarea>
      </div>
      <button onclick="AddResponse(${val2})">Add Response</button>
  </div>
  `
  disPortal.appendChild(myDiv);
  displayResponses(val2);
 
}
function ResolveTheQuestion(val){
        let container=document.getElementsByClassName("lowerQuestionForm")[0];
        console.log("Inside resolve the question method "+val);
       console.log(container.children);
       let ans;
       let count=0;
       Array.from(container.children).forEach(function(value){
              if(value.id==val){
                 ans=count;
                console.log(value.id);
              }
              count++;
       })
       deleteFromLocalStorage(val);
       container.children[ans].remove();
       QuestionScreen();
       console.log("removed successfully");
}
function deleteFromLocalStorage(val){
        obj=JSON.parse(localStorage.getItem("item"));
        let count=0;
        let ans;
        obj.forEach(function(value){
            if(value.id==val){
              ans=count;
              console.log("Inside delete from Local Storage");
            }
            count++;
        })
        obj.splice(ans,1);
        localStorage.setItem("item",JSON.stringify(obj));

}
function displayResponses(val){
      console.log("In display Responses function "+val);
      let count=0;
      let ans;
      let obj=JSON.parse(localStorage.getItem("item"));
      obj.forEach(function(value){
            if(value.id==parseInt(val)){
                  ans=count;
            }
            count++;
      })
      console.log("Printing the value of ans in displayResponses function "+ans)

      obj=JSON.parse(localStorage.getItem("item"))
      let responseArray=obj[ans].Responses;
      console.log(responseArray);
      let AddResponseContainer=document.getElementById("AddResponses");
      AddResponseContainer.style.backgroundColor="gray"
      if(responseArray.length!=0){
        responseArray.forEach(function(value){
          // console.log(AddResponseContainer)
           let myDiv=document.createElement("div");
           myDiv.innerHTML=`<h5>${value.Name}</h5>
           <p>${value.response}</p>`
           AddResponseContainer.appendChild(myDiv)
         })
      }
     

}

function AddResponse(val1){
 console.log("Printing the value of val1 in AddResponse() function "+val1);
 let name=document.getElementById("name").value;
 
 let response=document.getElementById("Response").value;
 console.log(name,response)
 let AddResponseContainer=document.getElementById("AddResponses");
 AddResponseContainer.style.backgroundColor="gray"
 console.log(AddResponseContainer)
 let myDiv=document.createElement("div");
 myDiv.innerHTML=`<h5>${name}</h5>
 <p>${response}</p>`
 AddResponseContainer.appendChild(myDiv)
 console.log("Before")
 AddResponsesToLocalStorage(name,response,val1);
 console.log("here")
}


function AddResponsesToLocalStorage(val1,val2,id){
  console.log("In AddResponsesToLocalStorage printing the id"+id);
  console.log(val1,val2)
  let count=0;
  let ans;
  let obj=JSON.parse(localStorage.getItem("item"));
  obj.forEach(function(value){
        if(value.id==parseInt(id)){
              ans=count;
        }
        count++;
  })
console.log("Counting the index of the required object "+ans);
let newObj={Name: val1,response: val2};
obj[ans].Responses.push(newObj);
localStorage.setItem("item",JSON.stringify(obj));

}

//adding the search functionality

function  searchFun(){
      let sBar=document.getElementById("searchBar");
       

      // let container=document.getElementsByClassName("lowerQuestionForm")[0];
      // let children=container.children;
      let val=sBar.value;
      console.log(val)
      if(JSON.parse(localStorage.getItem("item"))!=undefined){
        arr=JSON.parse(localStorage.getItem("item"));
        if(val==''){
          displayLocalStorage()
        }
        else {
          filtered=arr.filter(function(value){
              if(value.topic.search(val)!=-1||value.question.search(val)!=-1){
                return true;
              }
              else {
                return false;
              }
         })
      console.log(filtered);
     
        displayFiltered(filtered,val);
        }
      }
     
    // console.log(children)
     
  
  
}

function displayFiltered(val,val2){
  
  let container=document.getElementsByClassName("lowerQuestionForm")[0];
  container.innerHTML=''
  val.forEach(function(value){
    let myDiv=document.createElement("div");
    myDiv.setAttribute("id",`${value.id}`);
    myDiv.setAttribute("class","myDiv")
    myDiv.innerHTML=`<button type="button" id="btn${value.id}" class="QuestionsButton" onclick=AddResponsePage(btn${value.id})>
    <h1 class="QuestionsHeading">${value.topic}</h1>
    <p class="QuestionsParagraph">${value.question}</p>
    
    </button>
    <div><img src=${(value.favourites)?"fillStar.png":"emptyStar.png"} id="img${value.id}" class="star" onclick="AddToFavourites('${value.id}')" alt="chalNikal"><div>`
    container.appendChild(myDiv);
  })
  let array=container.children;
  Array.from(array).forEach(function(value){
    console.log(value.children[0].children[0].innerText);
    console.log(value.children[0].children[1].innerText);
    let index=value.children[0].children[0].innerText.search(val2);
    let index2=value.children[0].children[1].innerText.search(val2);
    console.log(index,index2)
    if(index!=-1){
      value.children[0].children[0].innerHTML=`${value.children[0].children[0].innerText.substring(0,index)}<span style="background-color:green">${value.children[0].children[0].innerText.substring(index,index+val2.length)}</span>${value.children[0].children[0].innerText.substring(index+val2.length)}`
     }
     if(index2!=-1){
      value.children[0].children[1].innerHTML=`${value.children[0].children[1].innerText.substring(0,index2)}<span style="background-color:green">${value.children[0].children[1].innerText.substring(index2,index2+val2.length)}</span>${value.children[0].children[1].innerText.substring(index2+val2.length)}`
      console.log(value.children[0].children[1].innerHTML);
     }
  })
 
    
 
}
// function createArray(){
//   let container=document.getElementsByClassName("lowerQuestionForm")[0];
//   arr=Array.from(container.children).map(function(value){
//          return value;
//   })
//   console.log("createArray")
//   console.log(arr[0].children[0].children[0])
//   console.log(arr[0].children[0].children[1])
// }

function AddToFavourites(val){
     console.log("hello add to favourites")
     console.log(val)
     let img=document.getElementById("img"+val);
     console.log(img)
     let count=0;
     let ans;
     let obj=JSON.parse(localStorage.getItem("item"));
     obj.forEach(function(value){
           if(value.id==parseInt(val)){
                 ans=count;
           }
           count++;
     })
    
     obj=JSON.parse(localStorage.getItem("item"));
     obj[ans].favourites=!obj[ans].favourites
     obj.sort(function(a,b){
         if(a.favourites && b.favourites){
          return 0;
         }
         if(!a.favourites && !b.favourites){
          return 0;
         }
         if(!a.favourites&&b.favourites){
          return 1;
         }
         else {
          return -1;
         }
     })
     localStorage.setItem("item",JSON.stringify(obj))
     if(obj[ans].favourites==true){
      img.setAttribute("src","fillStar.png");
     }
     else {
      img.setAttribute("src","emptyStar.png");
     }
     let sBar=document.getElementById("searchBar");
     if(sBar.value==''){
      displayLocalStorage()
     }
     
}