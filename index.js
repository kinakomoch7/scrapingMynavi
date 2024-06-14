const puppeteer = require("puppeteer");

!(async () => {
  try {
    const url =
      "https://job.mynavi.jp/26/pc/corpinfo/displayCorpSearchByIs/doSearchOther?industryCtgCd=64";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.click("li.right > a");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // 中のページへのリンクを取得
    const target = "div.boxSearchresultEach_head > h3 > a";
    const links = await page.evaluate((selector) => {
      const elements = Array.from(document.querySelectorAll(selector));
      const data = [];
      for (const element of elements) {
        data.push({
          title: element.textContent,
          link: element.href,
        });
      }
      return data;
    }, target);

    for (let i = 0; i < links.length; i++) {
      const pageDetail = await browser.newPage();
      await pageDetail.goto(links[i].link, { waitUntil: "networkidle0" });

      // 詳細ページの指定された要素を取得
      const targetDetail = "span.last.deadline";
      const deadlines = await pageDetail.evaluate((selector) => {
        const elements = Array.from(document.querySelectorAll(selector));
        return elements.map((element) => element.textContent);
      }, targetDetail);

      console.log(`${links[i].title} : ${deadlines}`);

      await pageDetail.close();
    }

    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
