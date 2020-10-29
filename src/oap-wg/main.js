import { getIntlData } from "../core/utils.js";
import { renderInlineCitation } from "../core/render-biblio.js";
import { pub } from "../core/pubsubhub.js";
export const name = "oap-wg/main";

var licenses = {
	"CC BY": {
		"text": "Creative Commons Attribution 4.0 International License",
		"url": "https://creativecommons.org/licenses/by/4.0/",
	}
};

export async function run(cfg)
{
	var dl;
	var hr;
	var wg_dt;
	var wg_dd;
	var gh_dt;
	var gh_dd;
	var head;
	var date;
	var style;
	var sub_h2;
	var con_par;
	var author_dd;
	var authors_dt;
	var doc_title;
	var license_par;
	var license_link;
	var text_date;
	var abs_section = document.getElementById("abstract");
	var con_section = document.getElementById("conformance");
	var abs_h2 = document.querySelector("#abstract > h2");
	var con_h2 = document.querySelector("#conformance > h2");
	var statuses = {
		"UD": "Unofficial Draft",
		"PR": "Proposal",
		"OD": "Official Draft",
		"LS": "Living Standard",
		"OB": "Obsolete"
	};

	style = document.createElement("style");
	style.innerHTML = "table, tbody, thead, tr, th, td {" +
						"border-color: #000000 !important;" +
						"border-width: 1px !important;" +
						"border-collapse: collapse !important;" +
						"border-style: solid !important;" +
						"padding: 8px !important;" +
						"padding-left: 40px !important;" +
						"padding-right: 40px !important;" +
						"text-align: center !important;" +
					  "}";
	document.head.insertAdjacentElement("beforeend", style);
	head = document.createElement("div");
	head.className = "head";
	date = new Date();
	text_date = `${date.getDay()} ${date.toLocaleString("en-us", { "month": "long" })} ${date.getFullYear()}`;
	if (cfg.title)
	{
		doc_title = document.createElement("h1");
		doc_title.id = "title";
		doc_title.classList.add("title");
		doc_title.textContent = cfg.title;
		head.insertAdjacentElement("beforeend", doc_title);
		sub_h2 = document.createElement("h2");
		sub_h2.id = "subtitle";
		sub_h2.textContent = "OAP-WG";
		if (cfg.status in statuses)
		{
			sub_h2.textContent += ` ${statuses[cfg.status]}`;
		}
		sub_h2.textContent += `, ${text_date}`;
		head.insertAdjacentElement("beforeend", sub_h2);
	}

	dl = document.createElement("dl");
	if (cfg.wg && cfg.wg.name)
	{
		wg_dt = document.createElement("dt");
		wg_dt.textContent = "Working Group:";
		wg_dd = document.createElement("dd");
		if (cfg.wg.url)
		{
			wg_dd.innerHTML = `<a href="${cfg.wg.url}">${cfg.wg.name}</a>`;
		} else
		{
			wg_dd.innerHTML = `${cfg.wg.name}`;
		}
		dl.insertAdjacentElement("beforeend", wg_dt);
		dl.insertAdjacentElement("beforeend", wg_dd);
	}
	if (cfg.authors && cfg.authors.length > 0)
	{
		authors_dt = document.createElement("dt");
		authors_dt.textContent = "Authors:";
		dl.insertAdjacentElement("beforeend", authors_dt);
		cfg.authors.forEach(function (author) {
			if (!author.name)
			{
				return;
			}
			author_dd = document.createElement("dd");
			author_dd.innerHTML = "";
			if (author.url)
			{
				author_dd.innerHTML = `<a href="${author.url}">${author.name}</a>`;
			} else
			{
				author_dd.innerHTML = `${author.name}`;
			}
			dl.insertAdjacentElement("beforeend", author_dd);
		});
	}

	if (cfg.github && cfg.github.repoURL)
	{
		gh_dt = document.createElement("dt");
		gh_dt.textContent = "GitHub:";
		gh_dd = document.createElement("dd");
		gh_dd.innerHTML = `<a href="https://github.com/${cfg.github.repoURL}">${cfg.github.fullName}</a>`;
		dl.insertAdjacentElement("beforeend", gh_dt);
		dl.insertAdjacentElement("beforeend", gh_dd);
	}
	head.insertAdjacentElement("beforeend", dl);

	if (cfg.license && licenses[cfg.license])
	{
		license_par = document.createElement("p");
		license_link = document.createElement("a");
		license_par.innerHTML = `This work is licensed under a <a href="${licenses[cfg.license].url}">${licenses[cfg.license].text}</a>.`;
		license_par.className = "copyright";
		head.insertAdjacentElement("beforeend", license_par);
	}

	hr = document.createElement("hr");
	head.insertAdjacentElement("beforeend", hr);
	document.body.prepend(head);

	if (abs_section)
	{
		abs_section.classList.add("introductory");
		//pub("error", abs_h2);
		if (!abs_h2)
		{
			abs_h2 = document.createElement("h2");
			abs_h2.textContent = "Abstract";
			abs_section.prepend(abs_h2);
		}
	}
	if (con_section)
	{
		con_section.classList.add("introductory");
		if (!con_h2)
		{
			con_h2 = document.createElement("h2");
			con_h2.textContent = "Conformance";
			con_section.prepend(con_h2);
			con_par = document.createElement("p");
			con_par.innerHTML = "As well as sections marked as non-normative, all authoring guidelines, " +
								"diagrams, examples, and notes in this specification are non-normative. " +
								"Everything else in this specification is normative.";
			con_section.append(con_par);
			con_par = document.createElement("p");
			con_par.innerHTML = `The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", "SHALL", "SHALL NOT", ` +
								`"MAY", "REQUIRED", "NOT REQUIRED", "RECOMMENDED", "NOT RECOMMENDED" and "OPTIONAL" ` +
								`in this document are to be interpreted as described in ` +
								`<a href="https://tools.ietf.org/html/bcp14">BCP 14</a> [[RFC2119]] [[RFC8174]] ` +
								`when, and only when, they appear in all capitals, as shown here.`;
			con_section.append(con_par);
		}
	}
	return 0;
}
