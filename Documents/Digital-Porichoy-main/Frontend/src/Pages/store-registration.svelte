<script>
  import axios from "axios";
  import router from "page";
  import {userTokenStore } from "../utility_functions";
  import Geolocation from "svelte-geolocation";
  let mycoords = [], coords = [];
  let userID = "hovAKK91OuNE2qWWQIkkhjIly222",
    name,
    username,
    trade_license,
    category,
    district,
    email = "",
    phone = "",
    formatted_phone;



  async function formSubmit() {
    formatted_phone = "+88" + phone;
    mycoords = coords;

    let request_body = {
      credentials: {
        provider_id: userID,
        trade_license: trade_license,
        category: category,
        name: name,
        phone: formatted_phone,
      },
      location: {
        district: district,
        long: mycoords[0],
        lat: mycoords[1],
      },
      offerings: [],
      ratings: [],
    };

    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/services/create_service",
      data: request_body,
    })
      .then(function (response) {
        console.log(response);

        if (response.data.userID == null) {
          alert("এই স্টোর তৈরি করাই আছে।");
        } else {
          router.redirect("/store");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
//   onMount(() => {
//   mapboxgl.accessToken =
//       "pk.eyJ1IjoibWFoZWVubWFzaHJ1ciIsImEiOiJjbDk5cnBxdW4xM2g3M3hsbWtwcnN6cHB2In0.38PIrzXSblk36C64gerW4w";
//     const map = new mapboxgl.Map({
//       container: "map",
//       style: "mapbox://styles/mapbox/outdoors-v11",
//       center: [90.38, 23.94], // starting position
//       zoom: 15, // starting zoom
//     });

//     // // Fullscreen and navigation control
//     map.addControl(new mapboxgl.NavigationControl());
//     map.addControl(new mapboxgl.FullscreenControl());

//     let geoLocator = new mapboxgl.GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true,
//       },
//       // When active the map will receive updates to the device's location as it changes.
//       trackUserLocation: true,
//       // Draw an arrow next to the location dot to indicate which direction the device is heading.
//       showUserHeading: true,
//     });

//     // Add geolocate control to the map.
//     map.addControl(geoLocator);

//     geoLocator.on("geolocate", function (location) {
//       user_longitude = location.coords.longitude;
//       user_latitude = location.coords.latitude;

//       console.log(user_longitude, user_latitude);
//     });


//     // Add mouse move control
//     // map.on("click", (e) => {
//     //   coords = {
//     //     longitude: e.lngLat.wrap().lng,
//     //     latitude: e.lngLat.wrap().lat,
//     //   };
//     //   console.log(coords);
//     // });
//   })

</script>

<!-- <Geolocation getPosition bind:mycoords /> -->

<Geolocation getPosition bind:coords>
    {console.log(coords)}
    
    
  </Geolocation>
<section id="contact" class="contact">
  <div class="container" data-aos="fade-up">
    <div class="section-header">
      <h2>Store Registration - স্টোর রেজিস্ট্রেশন</h2>
    </div>

    <div class="row gx-lg-0 gy-4">
      
        <div class="col-4"/>
      <div class="col-4">
        <form class="php-email-form">
            
          <div class="form-group mt-3">
            <input
              type="text"
              name="name"
              class="form-control"
              id="name"
              placeholder="স্টোরের নাম লিখুন"
              required
              bind:value={name}
            />
          </div>
          <div class="form-group mt-3">
            <input
              type="text"
              name="username"
              class="form-control"
              id="username"
              placeholder="স্টোরের ধরণ লিখুন"
              required
              bind:value={category}
            />
          </div>
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              name="phone"
              id="phone"
              placeholder="স্টোরের ফোন নাম্বার লিখুন (যেমন: 01778654707)"
              required
              bind:value={phone}
            />
          </div>
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              name="password"
              id="text"
              placeholder="জেলার নাম লিখুন"
              required
              bind:value={district}
            />
          </div>
          <div class="form-group mt-3">
            <input
              type="text"
              class="form-control"
              name="confirm-password"
              id="username"
              placeholder="ট্রেড লাইসেন্স নাম্বার লিখুন"
              required
              bind:value={trade_license}
            />
          </div>
          <div class="text-center form-group mt-3">
            <button
              type="button"
              class="btn btn-success rounded-pill"
              on:click={formSubmit}>Register - রেজিস্টার</button
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
