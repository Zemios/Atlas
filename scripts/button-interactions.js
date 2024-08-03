export function toggleLightMode() {
    const root = document.documentElement;
    const expanding_circle = document.getElementById("lightmode-expanding-circle")
    const button = document.getElementById('lightmode-button')
    button.firstElementChild.classList.toggle('bi-sun-fill')
    button.firstElementChild.classList.toggle('bi-moon-fill')
    var lightColor = getComputedStyle(root).getPropertyValue('--light');
    var darkColor = getComputedStyle(root).getPropertyValue('--dark');

    var colorScheme = getComputedStyle(root).getPropertyValue('--final-background-color');

    expanding_circle.classList.remove("lightmode-expanding-circle-animation");
    void expanding_circle.offsetWidth;
    expanding_circle.classList.add("lightmode-expanding-circle-animation");

    if (colorScheme === lightColor) {
        root.style.setProperty('--final-background-color', darkColor);
        root.style.setProperty('--initial-background-color', lightColor);
    } else {
        root.style.setProperty('--final-background-color', lightColor);
        root.style.setProperty('--initial-background-color', darkColor);
    }

}
