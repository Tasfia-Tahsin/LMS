<script>
  import Navbar from "./components/Navbar.svelte";
  // import CustomerSignup from "./Pages/customer-signup.svelte";
  // import CustomerLogin from "./Pages/customer-login.svelte";
  import Home from "./Pages/home.svelte";
  import Signup from "./Pages/signup.svelte";
  import Login from "./Pages/login.svelte";
  import EditProfile from "./Pages/edit-profile.svelte";//change
 // import ChangePhoto from "./Pages/change-photo.svelte";//change
  import Map from "./Pages/map.svelte";
  import router from "page";
  import StoreRegistration from "./Pages/store-registration.svelte";
  import Store from "./Pages/store.svelte"
  import Services from "./Pages/services.svelte";
  import { auth } from "./firebase_conf";
  import Logout from "./Pages/logout.svelte";
  
  import Dashboard from "./Pages/dashboard.svelte";

  import { isLoggedIn, userTokenStore } from "./utility_functions";

  let page;

  router("/customer-signup", () => (page = CustomerSignup));
  router("/customer-login", () => (page = CustomerLogin));
  router("/map", () => (page = Map));
  router("/services", () => (page = Services));
  router("/logout", () => (page = Logout));
  router("/", () => (page = Home));
  router("/login", () => (page = Login));
  router("/edit-profile", () => (page = EditProfile));
  router("/signup", () => (page = Signup));
  router("/store-registration", () => (page = StoreRegistration));
  router("/store", () => (page = Store));
 // router("/change-photo", () => (page = ChangePhoto));
  router("/dashboard", () => (page = Dashboard));
  router.start();
</script>

<main>
  <Navbar />
  <svelte:component this={page} />
</main>

<style>
</style>
