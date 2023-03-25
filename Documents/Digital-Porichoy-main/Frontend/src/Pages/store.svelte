<script>
  import axios from "axios";
  import Geolocation from "svelte-geolocation";
  import { onMount } from "svelte";
  import { bind } from "svelte/internal";

  let shops = [], shop, shopName, category, description = "This is a shop", proprietor = "Mr. X";
  function mockGetStore() {
    axios
      .get("http://127.0.0.1:8000/services/search_service", {
        params: {
          district: "gazipur",
          category: "mechanic",
          long: 90.38090089366824,
          lat: 23.948577732828085,
          distance: 10,
          search_limit: 50,
        },
      })
      .then(function (response) {
        shops = response.data.result;
        shop = shops[0];
        shopName = shop.credentials.name;
        category = shop.credentials.category;
        console.log(shopName)

      });
  }
mockGetStore();

</script>

<Geolocation getPosition let:coords>
  {console.log(coords)}
</Geolocation>
<main id="main">
  <section id="blog" class="blog">
    <div class="container" data-aos="fade">
      <div class="row g-5">
        <div class="col-lg-8">
          <article class="blog-details">
            <div class="post-img">
              <img src="assets/img/blog/blog-1.jpg" alt="" class="img-fluid" />
            </div>

            <h1 class="title">{shopName}</h1>

            <div class="meta-top">
              <ul>
                <li class="d-flex align-items-center">
                  <i class="bi bi-person" />
                  <a href="blog-details.html">{proprietor}</a>
                </li>
                
              </ul>
            </div>
            <!-- End meta top -->

            

            

        </div>

        <div class="col-lg-4">
          <div class="sidebar">
            <div class="sidebar-item categories">
              <h3 class="sidebar-title">Category</h3>
              <ul class="mt-3">
                <li>{category} </li>
              </ul>
            </div>
            <!-- End sidebar categories-->
          </div>

          <div class="sidebar">
            <div class="sidebar-item categories">
              <h3 class="sidebar-title">About</h3>
              <ul class="mt-3">
                <li>{description} </li>
              </ul>
            </div>
            <!-- End sidebar categories-->
          </div>

          <div class="sidebar">
            <div class="sidebar-item categories">
              <h3 class="sidebar-title">Service Hours</h3>
              <ul class="mt-3">
                <li><b>Opens:</b> 8:00 am </li>
                <li><b>Closes:</b> 8:00 pm </li>
                <li><b>Off-day:</b> Friday </li>
              </ul>
            </div>
            <!-- End sidebar categories-->
          </div>
          <!-- End Blog Sidebar -->
        </div>
      </div>
    </div>
  </section>
  <!-- End Blog Details Section -->
</main>

<!-- End #main -->
<style>
</style>
