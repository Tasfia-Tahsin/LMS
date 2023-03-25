<script>
  import axios from "axios";
  import router from "page";
  import utf8 from "utf8";
  import { auth, signInWithCustomToken } from "../firebase_conf";
  import {
    checkPhoneNumber,
    logOut,
    userTokenStore,
  } from "../utility_functions";

  let password,
    phone = "",
    formatted_phone;

  async function formSubmit() {
    if (checkPhoneNumber(phone)) {
      formatted_phone = "+88" + phone;
      console.log(phone, password);

      let request_body = {
        phone: formatted_phone,
        password: password,
      };

      await axios({
        method: "post",
        url: "http://127.0.0.1:8000/auth/customer_auth/login",
        data: request_body,
      })
        .then(function (response) {
          if (response.data["userId"] === null) {
            alert("এই তথ্যে ইউজার নেই। সঠিক তথ্য দিয়ে চেষ্টা করুন।");
          } else {
            let userToken = utf8.encode(response.data["userId"]);

            signInWithCustomToken(auth, userToken)
              .then(function (userCredentials) {
                auth.currentUser
                  .getIdToken(true)
                  .then((token) => {
                    localStorage.setItem("userToken", token);
                    userTokenStore.set(localStorage.getItem("userToken"));
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch(function (error) {
                console.log(error);
              });

            router.redirect("/");
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }
</script>

<section id="contact" class="contact">
  <div class="container" data-aos="fade">
    <div class="section-header">
      <h2>Login</h2>
    </div>

    <div class="row gx-lg-0 gy-4">
      <div class="col-4" />

      <div class="row gx-lg-0 gy-4">
        <div class="col-4" />

        <div class="col-4 align-self-center">
          <form class="php-email-form">
            <div class="form-group mt-3">
              <input
                type="text"
                name="phone"
                class="form-control"
                id="phone"
                placeholder="ফোন নাম্বার লিখুন"
                required
                bind:value={phone}
              />
            </div>
            <div class="form-group mt-3">
              <input
                type="password"
                class="form-control"
                name="password"
                id="password"
                placeholder="পাসওয়ার্ড লিখুন"
                required
                bind:value={password}
              />
            </div>
            <!--
>>>>>>> main
            <div class="my-3">
              <div class="loading">Loading</div>
              <div class="error-message"></div>
              <div class="sent-message">Your message has been sent. Thank you!</div>
            </div> -->

            <div class="text-center form-group mt-3">
              <p>Don't have an account? <a href="\signup"> Sign Up</a></p>
              <button
                type="button"
                class="btn btn-success rounded-pill"
                on:click={formSubmit}>Login - লগ ইন করুন</button
              >
            </div>
          </form>
        </div>
        <!-- End Contact Form -->
      </div>
    </div>
  </div>
</section>

<!-- End Contact Section -->
<style>
</style>
