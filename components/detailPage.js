module.exports = async function detailPage(companyCards) {
  // リンク先のページを開いて、指定された要素を取得
  for (let i = 0; i < companyCards.length; i++) {
    const pageDetail = await browser.newPage();
    await pageDetail.goto(companyCards[i].link, {
      waitUntil: "networkidle0",
    });

    // 詳細ページの指定された要素を取得
    const targetDetail = "span.last.deadline";
    const deadlines = await pageDetail.evaluate((selector) => {
      const elements = Array.from(document.querySelectorAll(selector));
      return elements.map((element) => element.textContent);
    }, targetDetail);

    const targetDetail2 = "div.category > ul > li";
    const industries = await pageDetail.evaluate((selector) => {
      const elements = Array.from(document.querySelectorAll(selector));
      return elements.map((element) => element.textContent);
    }, targetDetail2);

    console.log(
      `${companyCards[i].title} : ${companyCards[i].deadlines}: ${companyCards[i].industries}`
    );

    // addData({
    //   name: links[i].title,
    //   deadline: deadlines,
    //   industry: industries,
    // });

    await pageDetail.close();
  }
};
