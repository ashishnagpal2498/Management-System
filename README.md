#This Project is about adding Items to the database and keeping a record of the items


Scripts - server.js

~ Server build on Express framework

~Passport for local Authentication

~ Database used - SQL
~ ORM Used - Sequelize

Files and their explanation
1) Index html is the root file which shows all the features of the project
   . You can 
   (i) Add a new Item to database
   (ii) Delete an Item from database
   (iii) View all issued Items 
   (iv) Display name of products , vendors , faculty , Deparment
    Lab 
    (v) Transfer the systems from one lab to another 
     
2) Forms - Different forms are used to enter values of products
 
3) Main.html - Dynamic file - which is used to display data of all the
    selected items in a single page using Ajax 
    
   Functions - 
  
   i) Window .onload - $()- it checks if the user is Admin 
   display the buttons - add edit delete , else Hide those
  
   ii) show() - This is related to all the menu present At the side bar -
   takes a parameter of event _ Which itself gives the type , on which button
   is clicked - TAKEING VALUE FROM USER DEFINED Attribute
   Take out all the Data- listed in that by AJAX get request on different 
   formrequest - 
   Then - call listfun ( data , list , formreq)
   
   iii) ListFun() - 
    Depeneding upon formreq - 
    the listfun decides - which option to choose 
    and after that listing of all the items by creating LI
    
    iv) CreateLi - creates LI for the item - according to the category shown
        and then return that li which is Appended in sideList
        Li have a special Function inside the attribute - onclick SelectedItem()
        and also a **USER DEFINED** attribute _List- val_ - Obj.id
        
    v) FunSelectedItem()    
     If any Item in the list is clicked - The function runs -
     having an event as a parameter - 
     
     Center Div will be Changed in this -
     Extract the **USER DEFINED** Attributes -  
     1) Category Will be know 
     2) id of the product -
         
        