/**
 * Creates a scrollable ad slot and adds it to an HTMLelement on the page
 * @param {HTMLElement} element - The element to inject the scrollable container into
 * @param {string} adSlotId - The ID that will be assigned to the ad slot within the scrollable container.
 */
export function setupScrollable(element, adSlotId) {
    // create variable to track active aniamtion
    let ticking = false;

    // create container as wrapper for scrolling ad
    const scrollableContainer = document.createElement("div");
    scrollableContainer.style.height = "100%";
    scrollableContainer.style.width = "100%";
    scrollableContainer.style.overflow = "hidden";

    // create container for creative and assign passed ID
    const adSlot = document.createElement("div");
    adSlot.id = adSlotId;
    adSlot.style.transition = "transform 5ms";
    scrollableContainer.appendChild(adSlot);

    // add onScroll callback on intersection if Intersection Observer API is available
    if (IntersectionObserver) {
        const intersectionObserver = new IntersectionObserver(
            handleIntersection,
            {
                threshold: 0,
            }
        );
        intersectionObserver.observe(scrollableContainer);

        function onScroll(e) {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    repeatOften();
                    ticking = false;
                });

                ticking = true;
            }
        }

        function repeatOften() {
            const intersectionDistance =
                scrollableContainer.getBoundingClientRect().top;
            if (
                intersectionDistance < 0 &&
                intersectionDistance >
                    -(scrollableContainer.offsetHeight - adSlot.offsetHeight)
            ) {
                const scrollDistance = Math.abs(intersectionDistance);
                adSlot.style.transform = "translateY(" + scrollDistance + "px)";
            }
        }

        function handleIntersection(entries) {
            const [entry] = entries;
            if (entry.isIntersecting) {
                window.addEventListener("scroll", onScroll, { passive: true });
            } else {
                window.removeEventListener("scroll", onScroll);
            }
        }

    }
    element.appendChild(scrollableContainer);
}
