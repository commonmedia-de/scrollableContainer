export function setupScrollable(element, adSlotId) {
    let ticking = false;
    const scrollableContainer = document.createElement("div");
    scrollableContainer.style.height = "100%";
    scrollableContainer.style.width = "100%";
    scrollableContainer.style.overflow = "hidden";

    const adSlot = document.createElement("div");
    adSlot.id = adSlotId;
    adSlot.style.transition = "transform 5ms";
    scrollableContainer.appendChild(adSlot);
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
