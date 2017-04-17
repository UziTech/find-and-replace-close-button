"use babel";
/* globals atom */

describe("find-and-replace-close-button", function () {
	// beforeEach(async function () {
	// 	const workspaceElement = atom.views.getView(atom.workspace);
	//
	// 	jasmine.attachToDOM(workspaceElement);
	//
	// 	const packagesActivated = Promise.all([
	// 			atom.packages.activatePackage("find-and-replace"),
	// 			atom.packages.activatePackage("find-and-replace-close-button"),
	// 		]);
	//
	// 	console.debug("command dispatch", atom.commands.dispatch(workspaceElement, "find-and-replace:toggle"));
	//
	// 	await packagesActivated;
	//
	// });
	beforeEach(function () {
		var packagesActivated;
		runs(_ => {
			var workspaceElement = atom.views.getView(atom.workspace);

			jasmine.attachToDOM(workspaceElement);

			packagesActivated = Promise.all([
				atom.packages.activatePackage("find-and-replace"),
				atom.packages.activatePackage("find-and-replace-close-button"),
			]);

			atom.commands.dispatch(workspaceElement, "find-and-replace:toggle");
		});
		waitsForPromise(_ => packagesActivated);
	});

	it("should add a button to .project-find", function () {
		expect(document.querySelector("atom-panel .project-find .find-and-replace-close-button")).toExist();
	});

	it("should add a button to .find-and-replace", function () {
		expect(document.querySelector("atom-panel .find-and-replace .find-and-replace-close-button")).toExist();
	});
});
