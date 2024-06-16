const puppeteer = require("puppeteer");
const addData = require("./components/addData");

!(async () => {
  try {
    const url =
      "https://job.mynavi.jp/26/pc/corpinfo/displayCorpSearchByIs/doSearchOther?industryCtgCd=64";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    while (true) {
      // 中のページへのリンクを取得
      const companyCardTarget = "div.boxSearchresultEach";
      const companyCards = await page.evaluate((selector) => {
        const elements = Array.from(document.querySelectorAll(selector));
        return elements.map((element) => {
          const array = Array.from(
            element.querySelectorAll("span.last.deadline")
          );
          return {
            title: element.querySelector("h3 > a").textContent,
            link: element.querySelector("h3 > a").href,
            deadlines: array.map((element) => element.textContent),
            industries: element.querySelector("span.core_job").textContent,
          };
        });
      }, companyCardTarget);

      //データを追加
      for (index in companyCards) {
        addData({
          name: companyCards[index].title,
          deadline: companyCards[index].deadlines,
          industry: companyCards[index].industries,
        });
      }

      // ページネーションのリンクをクリックできるか判定
      const nextPageLink = await page.$("li.right > a");
      if (!nextPageLink) {
        break; // 次のページリンクが存在しない場合ループを終了
      }

      // 次のページのリンクをクリック
      await nextPageLink.click();
      await page.waitForNavigation({ waitUntil: "networkidle0" });
    }

    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
