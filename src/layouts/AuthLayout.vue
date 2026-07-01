<template>
  <img src="../../public/logo-grey.png" width="50px" class="absolute left-1/2 -translate-x-1/2" />
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-slate-50 to-gray-200 p-4">
    <div class="flex flex-col items-center justify-center bg-white h-[50vh] lg:h-[50vh] w-[90vw] lg:w-[40vw] rounded-md shadow-sm p-8 gap-5">
      <router-view />
    </div>
  </div>
</template>
