"use babel";

import { createRunner } from "atom-jasmine2-test-runner";

export default createRunner({
	specHelper: {
		jasmineFocused: true,
		jasminePromises: true,
		attachToDom: true,
		customMatchers: true,
		ci: true
	},
});
