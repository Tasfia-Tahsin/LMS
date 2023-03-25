<script>
  import { userTokenStore } from "../utility_functions";
</script>

<header id="header" class="header d-flex align-items-center">
  <div
    class="container-fluid container-xl d-flex align-items-center justify-content-between"
  >
    <a href="/" class="logo d-flex align-items-center">
      <h1><span>Digital </span>পরিচয়</h1>
    </a>
    <nav id="navbar" class="navbar">
      <ul>
        <li><a href="/">Home</a></li>

        <li><a href="/services">Services</a></li>
        <li><a href="/map">Services Nearby</a></li>
        {#if $userTokenStore != "null" && $userTokenStore}
          <li><a href="/store-registration">Create Store</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/logout">Logout</a></li>
        {:else}
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign Up</a></li>
        {/if}
      </ul>
    </nav>
    <!-- .navbar -->

    <i class="mobile-nav-toggle mobile-nav-show bi bi-list" />
    <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />
  </div>
</header>
<!-- End Header -->

<!-- End Header -->
<style>
</style>
