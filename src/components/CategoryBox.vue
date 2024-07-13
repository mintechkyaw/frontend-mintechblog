<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div>
    <input type="radio" class="btn-check" name="btnradio" :id="categoryName" autocomplete="off" />
    <label class="btn btn-outline-primary m-1 rounded" :for="categoryName">{{
      categoryName
    }}</label>
  </div>
</template>

<script setup>
defineProps({
  categoryName: {
    type: String,
    required: true
  }
})
</script>
