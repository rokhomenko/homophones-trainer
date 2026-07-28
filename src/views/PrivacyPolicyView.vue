<template>
  <section
    class="relative overflow-hidden border border-stone-800/90 bg-[#15130f]/88 px-5 py-8 shadow-[0_18px_60px_rgb(0_0_0/0.25)] rounded-[2rem] sm:px-8">
    <p class="mb-6 text-xs uppercase tracking-[0.28em] text-stone-400">
      Last updated: July 28, 2026
    </p>

    <div class="space-y-4 text-sm leading-7 text-stone-300 sm:text-base">
      <p>Welcome to Homophones Trainer ("the Service").</p>

      <p>
        This Privacy Policy explains what personal information is collected, how it is used, and
        what rights you have when using the Service.
      </p>

      <p>
        By creating an account or using the Service, you acknowledge that you have read this Privacy
        Policy.
      </p>

      <h2 class="text-lg font-bold text-stone-100">1. Data Controller</h2>
      <p>The Service is operated by a private individual.</p>
      <p>
        If you have any questions regarding this Privacy Policy or your personal data, you may
        contact the Service owner using the
        <router-link to="/contact" class="text-[#d99165] hover:underline">contact form</router-link>
        provided on the
        <router-link to="/contact" class="text-[#d99165] hover:underline">Contact</router-link>
        page.
      </p>

      <h2 class="text-lg font-bold text-stone-100">2. Personal Data We Collect</h2>
      <p>When you create an account, we collect:</p>
      <ul class="list-disc space-y-1 pl-6">
        <li>email address;</li>
        <li>hashed password (your password is never stored in plain text);</li>
        <li>account creation date.</li>
      </ul>
      <p>While you use the Service, we also store:</p>
      <ul class="list-disc space-y-1 pl-6">
        <li>the learning groups you have marked as learned;</li>
        <li>the date each learning group was marked as learned.</li>
      </ul>

      <h2 class="text-lg font-bold text-stone-100">3. Why We Process Your Data</h2>
      <p>Your data is processed for the purpose of:</p>
      <ul class="list-disc space-y-1 pl-6">
        <li>creating and managing your account;</li>
        <li>authenticating your identity;</li>
        <li>allowing you to sign in securely;</li>
        <li>saving your learning progress;</li>
        <li>displaying your learned content.</li>
      </ul>

      <h2 class="text-lg font-bold text-stone-100">4. Authentication</h2>
      <p>The Service currently supports authentication using email address and password.</p>
      <p>Passwords are stored only as cryptographic hashes using Argon2.</p>

      <h2 class="text-lg font-bold text-stone-100">5. Local Storage</h2>
      <p>
        The Service stores an authentication token in your browser's Local Storage so you can remain
        signed in between visits.
      </p>
      <p>No data is stored in Session Storage.</p>

      <h2 class="text-lg font-bold text-stone-100">6. Email Communications</h2>
      <p>The Service does not send emails.</p>
      <p>No newsletters, marketing emails, or automated notifications are sent.</p>

      <h2 class="text-lg font-bold text-stone-100">7. Analytics</h2>
      <p>The Service does not use analytics for advertising or marketing purposes.</p>
      <p>
        The website is hosted on Vercel, which may collect limited technical usage information through its platform
        analytics.
      </p>

      <h2 class="text-lg font-bold text-stone-100">8. Data Sharing</h2>
      <p>Your personal data is not sold or shared with third parties for marketing purposes.</p>
      <p>
        Your personal data is processed only by service providers required to operate the Service, including:
      </p>
      <ul class="list-disc space-y-1 pl-6">
        <li>Vercel (frontend hosting);</li>
        <li>Contabo (backend server and database hosting).</li>
      </ul>

      <h2 class="text-lg font-bold text-stone-100">9. Data Storage</h2>
      <p>The backend server and database are hosted on a VPS located in Germany.</p>
      <p>User data is stored in a PostgreSQL database on that server.</p>

      <h2 class="text-lg font-bold text-stone-100">10. Data Retention</h2>
      <p>Personal data is retained until you request deletion of your account.</p>
      <p>Learning progress remains associated with your account until your account is deleted.</p>
      <p>The Service currently does not create backup copies of user data.</p>

      <h2 class="text-lg font-bold text-stone-100">11. Account Deletion</h2>
      <p>
        If you would like your account and associated data to be deleted, you may submit a request
        using the
        <router-link to="/contact" class="text-[#d99165] hover:underline">contact form</router-link>
        available on the website.
      </p>
      <p>
        Please provide the email address associated with your account so your request can be
        verified.
      </p>
      <p>
        Upon processing your request, your account and associated learning data will be permanently
        deleted from the Service.
      </p>

      <h2 class="text-lg font-bold text-stone-100">12. Security</h2>
      <p>Appropriate technical measures are used to protect your information, including:</p>
      <ul class="list-disc space-y-1 pl-6">
        <li>HTTPS encryption;</li>
        <li>password hashing using Argon2;</li>
        <li>authenticated access using JSON Web Tokens (JWT).</li>
      </ul>
      <p>
        Despite appropriate technical measures, no Internet service can guarantee
        absolute security.
      </p>

      <h2 class="text-lg font-bold text-stone-100">13. Your Rights</h2>
      <p>
        You may submit privacy-related requests using the
        <router-link to="/contact" class="text-[#d99165] hover:underline">contact form</router-link>
        available on the website. Requests will be handled in accordance with applicable data protection laws.
      </p>
      <p>
        To help verify your request, please include the email address associated with your account.
      </p>

      <h2 class="text-lg font-bold text-stone-100">14. Changes to This Privacy Policy</h2>
      <p>This Privacy Policy may be updated from time to time.</p>
      <p>The latest version will always be available on this website.</p>

      <h2 class="text-lg font-bold text-stone-100">15. Contact</h2>
      <p>
        If you have any questions about this Privacy Policy or wish to request deletion of your
        account, you may contact the Service owner using the
        <router-link to="/contact" class="text-[#d99165] hover:underline">contact form</router-link>
        available on the website.
      </p>
    </div>
  </section>
</template>
