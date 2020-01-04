const switchColor = document.querySelector(".switch-selection");
const offSwitch = document.getElementById("off");
const onSwitch = document.getElementById("on");

offSwitch.addEventListener("click", () => {
    switchColor.style.backgroundColor = "red";
    console.log(switchColor.style.backgroundColor);
});

onSwitch.addEventListener("click", () => {
    switchColor.style.backgroundColor = "#65bd63";
});
