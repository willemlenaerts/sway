---
layout: post
title: "Scraping GoPress.be"
description: "Building a python module to scrape GoPress.be"
categories: [notes, popular]
tags: [python, selenium, scraping]
alias: [/2015/05/29/]
last_updated: May 29, 2015
---
GoPress.be is a Belgian press database that contains all the articles from every Belgian newspaper or magazine since ... forever.
Searching the data is straightforward (if you have an account), but acquiring large amounts of data is NOT ([there seems to be an API][GoPress API], but documentation is non-existent and I assume it requires a special license).
So in order to get this data I needed to build a scrape tool, which I'm sharing with the world here.

* Kramdown table of contents
{:toc .toc}

## Requirements
{: #requirements}

1. [**Python > 3**][python]

2. [**Selenium**][selenium]

	GoPress.be loads extra search results while scrolling using an AJAX call. Scraping it with static tools a la `urllib`, `httplib` or `requests` is therefore unfortunately not an option.
	Selenium basically just takes over your browser and if you're using Google Chrome (and who isn't) you need to download [chromedriver.exe][chromedriver] and place it in your python map. 
	(It works with Firefox and IE as well)

## A Very Short User Manual
{: #usermanual}

Since I've kept most of the technical stuff under the hood, working with the package is very simple, as you'll see:

1. Download & install the [gopress package][gopress]

	> pip install gopress<br />
	
2. Define your search query

	> **username**: your GoPress.be username (**string**)<br />
	> **password**: your GoPress.be password (**string**)<br />
	> **searchstring**: string you are looking for (**string**)<br />
	> **from**: starting date (**dict** with keys `dag`, `maand` and `jaar`)<br />
	> **to**: end date (**dict** with keys `dag`, `maand` and `jaar`)<br />
	> **publications**: publications you are querying (**list** of dict objects containing keys `naam`, `editie` and `type`)<br />
	
3. Search already!

	> **from** gopress **import** GoPress<br />
	> output = GoPress(username,password,searchstring,from,to,publications)<br />
	> <br />
	> The function returns a list containing all the articles that matched the search query.<br />
	> Every aricle is a dict with keys `tekst`, `datum`, `link_id`, `titel`, `pagina` and `publicatie`<br />

## Example
{: #example}

Let's say you're interested in analysing the media coverage of a certain politician over the years. Who isn't?
Well, that's exactly whsat this tool is for!

Let's analyze the coverage of Bart De Wever, a famous Belgian politician, in De Standaard, a well-known Belgian newspaper, between 2002 and now:

	> searchstring = "Bart De Wever"
	> from = {"dag": "1", "maand": "Januari", "jaar": "2002"}
	> to = {"dag": "24", "maand": "Mei", "jaar": "2015"}
	> publicaties = [{"naam":"De Standaard","type":"krant","editie":""}]
	
	> output = GoPress(username,password,searchstring,from,to,publications)
	
And of we go! You'll see a browser starting, surfing to the GoPress site and filling in the username and password, after which it starts typing in the search query. All by itself. 
A little freaky the first time you see it, and that's why I've also made sure the user can see some good old boring output:

<a class="post-image" href="/img/2015-05-29-gopress-scrape-output.png" title="GoPress Scrape Output">
<img itemprop="image" data-src="/img/2015-05-29-gopress-scrape-output.png" src="/img/2015-05-29-gopress-scrape-output.png" alt="GoPress Scrape Output" />
</a>

## Troubleshooting
{: #troubleshooting}

Because I've done a lot (a lot) of troubleshooting myself, the algorithm is very stable at the moment. 
Almost everything that can go wrong using selenium is covered (which required some very complex automatic waiting and browser restarting code).
But one is never ever sure so hit me up in the comments below or via mail/twitter/whatever if something goes wrong.

Happy scraping!

[GoPress API]: https://api.gopress.be/
[python]: https://www.python.org/
[selenium]: https://selenium-python.readthedocs.org/installation.html
[chromedriver]: https://sites.google.com/a/chromium.org/chromedriver/downloads
[gopress]: https://pypi.python.org/pypi/gopress/0.3
