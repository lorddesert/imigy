<script> 
export let toggleTheme
  
</script>

<div class="switch-container">
    <label class="switch">
        <input type="checkbox" id="themeSlider" on:change={toggleTheme}>
        <span class="slider round"></span>
    </label>
</div>

<style>
    
  /* The switch - the box around the slider */
.switch-container {
    position: absolute;
    right: 5vw;
    top: 5vh;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background-color);
  -webkit-transition: .4s;
  transition: .4s;
  border: 2px solid var(--font-color);
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 3px;
  bottom: 3px;
  background-color: var(--font-color);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--background-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--font-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>