<script>
  import { auth } from "../firebase_conf";
  import axios from "axios";
  import { userTokenStore } from "../utility_functions";

</script>

<!-- ======= Hero Section ======= -->
<section id="hero" class="hero">
  <div class="container position-relative">
    <div class="row gy-5" data-aos="fade-in">
      <div
        class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start"
      >
        <h2>Welcome to <br /><span>Digital পরিচয়</span></h2>
        <p>
          A platform for small business-owners to create an online signature and for clients to connect with them.
        </p>
        <div class="d-flex justify-content-center justify-content-lg-start">
          <a href="#about" class="btn-get-started">Get Started - শুরু করুন</a>
          <a
            href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            class="glightbox btn-watch-video d-flex align-items-center"
            ><i class="bi bi-play-circle" /><span>Watch Video - ভিডিও দেখুন</span></a
          >
        </div>
      </div>
      <div class="col-lg-6 order-1 order-lg-2">
        <img
          src="assets/img/hero-img.svg"
          class="img-fluid"
          alt=""
          data-aos="zoom-out"
          data-aos-delay="100"
        />
      </div>
    </div>
  </div>

  <div class="icon-boxes position-relative">
    <div class="container position-relative">
      <div class="row gy-4 mt-5">
        <div class="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
          <div class="icon-box">
            <div class="icon"><i class="bi bi-easel" /></div>
            <h4 class="title">
              {#if $userTokenStore}
              <a href="\store-registration" class="stretched-link">Create Store<br>স্টোর তৈরি করুন</a>
              {:else}
              <a href="\login" class="stretched-link">Create Store<br>স্টোর তৈরি করুন</a>
              {/if}
            </h4>
          </div>
        </div>
        <!--End Icon Box -->

        <div class="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="bi bi-gem" /></div>
            <h4 class="title">
              <a href="\services" class="stretched-link">Services <br> সার্ভিসের তালিকা দেখুন</a>
            </h4>
          </div>
        </div>
        <!--End Icon Box -->

        <div class="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
          <div class="icon-box">
            <div class="icon"><i class="bi bi-geo-alt" /></div>
            <h4 class="title">
              <a href="\map" class="stretched-link">Services Near You <br> আপনার নিকটবর্তী সার্ভিস</a>
            </h4>
          </div>
        </div>
        <!--End Icon Box -->

        <div class="col-xl-3 col-md-6" data-aos="fade-up" data-aos-delay="500">
          <div class="icon-box">
            <div class="icon"><i class="bi bi-command" /></div>
            <h4 class="title">
              <a href="\signup" class="stretched-link">Connect <br> যুক্ত হউন</a>
            </h4>
          </div>
        </div>
        <!--End Icon Box -->
      </div>
    </div>
  </div>
</section>

<!-- End Hero Section -->
<style>
</style>
