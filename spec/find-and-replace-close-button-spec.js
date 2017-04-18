"use babel";
/* globals atom */

describe("find-and-replace-close-button", function () {
	beforeEach(async function () {
		const workspaceElement = atom.views.getView(atom.workspace);

		jasmine.attachToDOM(workspaceElement);

		const packagesActivated = Promise.all([
				atom.packages.activatePackage("find-and-replace"),
				atom.packages.activatePackage("find-and-replace-close-button"),
			]);

		atom.commands.dispatch(workspaceElement, "find-and-replace:toggle");

		await packagesActivated;

	});

	it("should add a button to .project-find", function () {
		expect(document.querySelector("atom-panel .project-find .find-and-replace-close-button")).toExist();
	});

	it("should add a button to .find-and-replace", function () {
		expect(document.querySelector("atom-panel .find-and-replace .find-and-replace-close-button")).toExist();
	});

	describe("clicking", function () {
		beforeEach(function () {
			spyOn(atom.commands, "dispatch").and.callThrough();
		});

		it("should call project-find:toggle", function () {
			const button = document.querySelector("atom-panel .project-find .find-and-replace-close-button");
			const panel = document.querySelector("atom-panel .project-find").closest("atom-panel");

			atom.commands.dispatch(atom.views.getView(atom.workspace), "project-find:show");
			expect(panel).toBeVisible();
			button.click();
			expect(panel).toBeHidden();

			expect(atom.commands.dispatch.calls.mostRecent().args[1]).toBe("project-find:toggle");
		});

		it("should call find-and-replace:toggle", function () {
			const button = document.querySelector("atom-panel .find-and-replace .find-and-replace-close-button");
			const panel = document.querySelector("atom-panel .find-and-replace").closest("atom-panel");

			atom.commands.dispatch(atom.views.getView(atom.workspace), "find-and-replace:show");
			expect(panel).toBeVisible();
			button.click();
			expect(panel).toBeHidden();

			expect(atom.commands.dispatch.calls.mostRecent().args[1]).toBe("find-and-replace:toggle");
		});
	});

	describe("deactivation", function () {
		beforeEach(async function () {
			await atom.packages.deactivatePackage("find-and-replace-close-button");
		});

		it("should remove the button in .project-find", function () {
			expect(document.querySelector("atom-panel .project-find .find-and-replace-close-button")).not.toExist();
		});

		it("should remove the button in .find-and-replace", function () {
			expect(document.querySelector("atom-panel .find-and-replace .find-and-replace-close-button")).not.toExist();
		});
	});
});
