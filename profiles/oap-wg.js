const modules = [
	/* Order is significant */
	import("../src/core/base-runner.js"),
	import("../src/core/ui.js"),
	import("../src/core/location-hash.js"),
	import("../src/core/style.js"),
	import("../src/core/github.js"),
	import("../src/core/data-include.js"),
	import("../src/core/reindent.js"),
	import("../src/oap-wg/main.js"),
	import("../src/core/data-transform.js"),
	import("../src/core/data-abbr.js"),
	import("../src/core/inlines.js"),
	import("../src/core/dfn.js"),
	import("../src/core/pluralize.js"),
	import("../src/core/examples.js"),
	import("../src/core/issues-notes.js"),
	import("../src/core/best-practices.js"),
	import("../src/core/figures.js"),
	import("../src/core/webidl.js"),
	import("../src/core/biblio.js"),
	import("../src/core/link-to-dfn.js"),
	import("../src/core/xref.js"),
	import("../src/core/data-cite.js"),
	import("../src/core/webidl-index.js"),
	import("../src/core/render-biblio.js"),
	import("../src/core/dfn-index.js"),
	import("../src/core/contrib.js"),
	import("../src/core/structure.js"),
	import("../src/core/informative.js"),
	import("../src/core/id-headers.js"),
	import("../src/core/caniuse.js"),
	import("../src/core/mdn-annotation.js"),
	import("../src/ui/save-html.js"),
	import("../src/core/seo.js"),
	import("../src/core/highlight.js"),
	import("../src/core/data-tests.js"),
	import("../src/core/list-sorter.js"),
	import("../src/core/highlight-vars.js"),
	import("../src/core/dfn-panel.js"),
	import("../src/core/data-type.js"),
	import("../src/core/algorithms.js"),
	import("../src/core/anchor-expander.js"),
	import("../src/core/custom-elements/index.js"),
	/* Linters must be the last thing to run */
	import("../src/core/a11y.js"),
];

document.addEventListener("DOMContentLoaded", function () {
	Promise.all(modules).then(function (all) {
		const [runner, { ui }, ...plugins] = all;

		ui.show();
		runner.runAll(plugins);
		ui.enable();
   });
});
