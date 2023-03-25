<script>
    import axios from "axios";
    import router from "page";
    import { empty } from "svelte/internal";
    import { auth, signInWithCustomToken } from "../firebase_conf";
    import { userTokenStore } from "../utility_functions";
    import { checkPassword, checkUsername } from "../utility_functions";
    
    let newName, newPhone, newUsername, newRole, newPass, newRetypePass;
    
    let request_body = {
      token: $userTokenStore,
    };

    const editProfile = ()=>{
        
        newName = document.forms["editProfileForm"]["newName"].value;
        newPass = document.forms["editProfileForm"]["newPass"].value;
        newUsername = document.forms["editProfileForm"]["newUsername"].value;
        newRetypePass = document.forms["editProfileForm"]["newRetypePass"].value;
     
        

        if(!newName){newName = name ;}
        if(!newUsername)newUsername = username ;

        if (checkPassword(newPass, newRetypePass) && checkUsername(newUsername)){
        
        console.log("New name: ",newName);
        console.log("old name:", name);
        console.log("New username: ",newUsername);
        console.log("old username:", username);
        console.log("New pass: ",newPass);
        console.log("old pass:", pass);

        router.redirect("/");

        }
    }
    let name, username, phone, role, userData, pass;
    let namePlaceholder,phonePlaceholder,usernamePlaceholder,passPlaceholder; 
    let txt1 = "Currently: "
    axios
      .post("http://127.0.0.1:8000/auth/get_user", request_body)
      .then((response) => {
        
        userData = response.data;
        name = userData.names.name;
        username = userData.names.username;
        phone = userData.credentials.phone;
        role = userData.names.role;
        pass = "Hidden Pass";

        namePlaceholder = txt1.concat(name);
        phonePlaceholder = txt1.concat(phone);
        usernamePlaceholder = txt1.concat(username);
        passPlaceholder = txt1.concat(pass);
      })
      .catch((error) => {
        console.log(error);
      });
     
      
      
  </script>

<section id="contact" class="contact">
    <div class="container" data-aos="fade-up">
      <div class="section-header">
        <h2>Edit profile </h2>
        <p>Edit the fields you want to change.</p>
        <p>পরিবর্তনীয় তথ্যগুলো দিন!</p>
      </div>
  
      <div class="row gx-lg-0 gy-4">
        <div class="col-4" />
  
        <div class="col-5 align-self-center">
          <form name = "editProfileForm" class="php-email-form">
            <div class="form-group mt-3">
              <p>Name:</p>
              <input
                type="text"
                class="form-control"
                placeholder={namePlaceholder}
                name = "newName" 
              />
            </div>


            <div class="form-group mt-3">
                <p>Password:</p>
                <input
                  type="password"
                  class="form-control"
                  placeholder={passPlaceholder}
                  name = "newPass" 
                />
            </div>

            <div class="form-group mt-3">
                <p>Retype Password:</p>
                <input
                  type="password"
                  class="form-control"
                  placeholder={passPlaceholder}
                  name = "newRetypePass" 
                />
            </div>



            <div class="form-group mt-3">
                <p>Username:</p>
                <input
                  type="text"
                  class="form-control"
                  placeholder={usernamePlaceholder}
                  name = "newUsername" 
                />
            </div>


            
              
            <div class="text-center form-group mt-3">
              <button
                type="button"
                class="btn btn-success rounded-pill"
                on:click={editProfile}>Save Changes</button
              >
            </div>
          </form>
        </div>
        <!-- End Contact Form -->
      </div>
    </div>
  </section>
  
  <!-- End Contact Section -->
  <style>
  </style>