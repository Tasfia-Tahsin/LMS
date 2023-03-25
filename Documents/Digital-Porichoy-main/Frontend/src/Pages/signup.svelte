<script>
  import axios from "axios";
  import router from "page";
  import { checkPhoneNumber, checkPassword } from "../utility_functions";

  let name,
    username,
    password,
    retype_password,
    email = "",
    phone = "",
    formatted_phone;

  async function formSubmit() {
    if (checkPassword(password, retype_password) && checkPhoneNumber(phone)) {
      formatted_phone = "+88" + phone;
      console.log(phone, password);

      let request_body = {
        userdata: {
          credentials: {
            email: email,
            phone: formatted_phone,
            password: password,
          },
          names: {
            name: name,
            username: username,
            role: "customer",
          },
          service_data: {
            favorite_provider: "",
            favorite_service: "",
            used_service_and_provider: [],
          },
        },
        password: password,
      };

      await axios({
        method: "post",
        url: "http://127.0.0.1:8000/auth/customer_auth/signup",
        data: request_body,
      })
        .then(function (response) {
          console.log(response);

          if (response.data.status == false) {
            alert("অ্যাকাউন্ট তৈরি করাই আছে। লগ ইন করুন।");
          } else {
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
  <div class="container" data-aos="fade-up">
    <div class="section-header">
      <h2>Sign Up - সাইন আপ</h2>
      <p>নিজের ব্যবসার পরিচিতি তৈরি করুন এক মুহূর্তেই!</p>
    </div>

    <div class="row gx-lg-0 gy-4">
      <div class="col-4" />

      <div class="col-5 align-self-center">
        <form class="php-email-form">
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="নিজের নাম লিখুন"
              required
              bind:value={name}
            />
          </div>
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              
              placeholder="নিজের ইউজার নাম লিখুন"
              required
              bind:value={username}
            />
          </div>
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              
              placeholder="নিজের ফোন নাম্বার লিখুন (যেমন: 01778654707)"
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
              placeholder="নিজের পাসওয়ার্ড লিখুন"
              required
              bind:value={password}
            />
          </div>
          <div class="form-group mt-3">
            <input
              type="password"
              class="form-control"
              name="confirm-password"
              id="confirm-password"
              placeholder="পাসওয়ার্ড আবার লিখুন"
              required
              bind:value={retype_password}
            />
          </div>
          
          <div class="text-center form-group mt-3">
            <button
              type="button"
              class="btn btn-success rounded-pill"
              on:click={formSubmit}>Sign up - সাইন আপ করুন</button
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
