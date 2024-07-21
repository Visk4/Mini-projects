const track = document.getElementById("image-track");

let isMouseDown = false; // Flag to track mouse state

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    isMouseDown = true; // Set flag to true when mouse button is down
}

window.onmousemove = e => {
    if (!isMouseDown) return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt - e.clientX);
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;

    let nextPercentage = Math.min(parseFloat(track.dataset.prevPercentage) + percentage,0);
    nextPercentage = Math.max(nextPercentage,-100);
    //Math.min(nextPercentage,0); Math.max(nextPercentage,-100);
    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    },{ duration:1200,fill:"forwards"});
    // track.style.transform = `translate(${nextPercentage}%, -50%)`;

    let images = track.querySelectorAll(".image");
    images.forEach(image => {
        image.animate({
            objectPosition : `${100 + nextPercentage}% 50%`
        },{duration:1200,fill:"forwards"})
    });
}

window.onmouseup = () => {
    isMouseDown = false; // Reset mouse down flag
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
