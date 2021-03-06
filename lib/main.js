"use babel";
/* globals atom */

import { CompositeDisposable, Disposable } from "atom";

export default {

	addFindAndReplaceButton(containerQuery, closeCommand) {
		const container = document.querySelector(containerQuery);
		const atomWorkspace = atom.views.getView(atom.workspace);

		let closeButton = document.createElement("span");
		closeButton.classList.add("find-and-replace-close-button", "header-item", "pull-right");
		closeButton.innerHTML = "<i class='icon icon-x clickable'></i>";
		atom.tooltips.add(closeButton, {
			title: "Close Panel <span class='keystroke'>Esc</span>",
			html: true,
		});
		closeButton.addEventListener("click", function () {
			atom.commands.dispatch(atomWorkspace, closeCommand);
		});

		this.disposables.add(new Disposable(function () {
			closeButton.remove();
		}));

		container.insertBefore(closeButton, container.firstChild);
	},

	addFindAndReplaceButtons() {
		if (!document.querySelector("atom-panel .project-find header")) {
			setTimeout(() => { this.addFindAndReplaceButtons(); }, 100);
		} else if (!document.querySelector(".find-and-replace .close-button")) {
			this.addFindAndReplaceButton("atom-panel .project-find header", "project-find:toggle");
			this.addFindAndReplaceButton("atom-panel .find-and-replace header", "find-and-replace:toggle");
		}
	},

	activate() {
		this.disposables = new CompositeDisposable();
		this.disposables.add(atom.packages.onDidActivatePackage(pkg => {
			if (pkg.name === "find-and-replace") {
				this.addFindAndReplaceButtons();
			}
		}));
		if (atom.packages.getActivePackage("find-and-replace")) {
			this.addFindAndReplaceButtons();
		}
	},

	deactivate() {
		if (this.disposables) {
			this.disposables.dispose();
		}
	},

};
