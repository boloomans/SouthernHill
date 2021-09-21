import $ from "jquery";
import 'bootstrap';
import './assets/styles/main.scss';

console.log('app.js loaded');

$(document).ready(() => {
  console.log('jquery works!');

	/**
	 * Sets up an intersection observer to notify when elements with the class
	 * `.sticky_sentinel--top` become visible/invisible at the top of the container.
	 * @param {!Element} container
	 */
	function observeHeaders(container) {
		const observer = new IntersectionObserver((records, observer) => {
			for (const record of records) {
				const targetInfo = record.boundingClientRect;
				const stickyTarget = record.target.parentElement.querySelector('.sticky');
				const rootBoundsInfo = record.rootBounds;

				// Started sticking.
				if (targetInfo.bottom < rootBoundsInfo.top) {
					fireEvent(true, stickyTarget);
				}

				// Stopped sticking.
				if (targetInfo.bottom >= rootBoundsInfo.top &&
					targetInfo.bottom < rootBoundsInfo.bottom) {
					fireEvent(false, stickyTarget);
				}
			}
		}, {threshold: [0], root: container});

		// Add the top sentinels to each section and attach an observer.
		const sentinels = addSentinels(container, 'sticky-top');
		sentinels.forEach(el => observer.observe(el));
	}
});
