import ArticlePage from "./pages/ArticlePage";

const articlesPage = new ArticlePage();
describe("Articles page", () => {
  // it("should have sortby with date, votes and comment count options ", () => {
  //   cy.visit("/articles");
  //   cy.get("[name=sort_by] option").then((options) => {
  //     const actual = [...options].map((option) => {
  //       return option.text;
  //     });
  //     cy.log(actual);
  //     expect(actual).to.deep.eq(["Date", "Votes", "Comment Count"]);
  //   });
  // });
  // it("should have order ascending and descending options ", () => {
  //   cy.visit("/articles");
  //   cy.get("[name=order] option").then((options) => {
  //     const actual = [...options].map((option) => {
  //       return option.text;
  //     });
  //     cy.log(actual);
  //     expect(actual).to.deep.eq(["Ascending", "Descending"]);
  //   });
  // });
  // it("should have default order by date and sort ascending", () => {
  //   cy.visit("/articles");
  //   cy.get("select")
  //     .eq(0)
  //     .find("option")
  //     .should("have.value", "created_at")
  //     .and("have.attr", "selected");
  //   cy.get("select")
  //     .eq(1)
  //     .find("option")
  //     .eq(1)
  //     .should("have.value", "desc")
  //     .and("have.attr", "selected");
  // });

  // it("should list articles correctly ordering by date and sorting by descending", () => {
  //   cy.visit("/articles");
  //   cy.get(".article p.box:nth-child(7)").then((dates) => {
  //     const actual = [...dates].map((date) => {
  //       return date.innerText.replaceAll(/\D/gi, "");
  //     });
  //     expect(actual).to.deep.eq([...actual].sort().reverse());
  //   });
  // });

  it("should have default order by date and sort descending", () => {
    articlesPage.visit();
    articlesPage.sortBy.find(":selected").contains("Date");
    articlesPage.orderBy.find(":selected").contains("Descending");
  });

  it("should list articles correctly ordering by date and sorting by descending", () => {
    articlesPage.visit();
    cy.areItemsOrdered("Date", "Descending");
  });

  it("should have order ascending and descending options ", () => {
    articlesPage.visit();

    articlesPage.orderByOptions.then((options) => {
      const actual = [...options].map((option) => {
        return option.text;
      });
      cy.log(actual);
      expect(actual).to.deep.eq(["Ascending", "Descending"]);
    });
  });
  it("should have sort Date, Votes  and Comment Count  options ", () => {
    articlesPage.visit();
    articlesPage.sortByOptions.then((options) => {
      const actual = [...options].map((option) => {
        return option.text;
      });
      cy.log(actual);
      expect(actual).to.deep.eq(["Date", "Votes", "Comment Count"]);
    });
  });

  it("should sort articles correctly when selecting by votes ascending", () => {
    articlesPage.visit();
    articlesPage.applySortby("Votes");
    cy.wait(1000)
    articlesPage.applyOrderBy("Ascending");
    cy.wait(2000);
    cy.areItemsOrdered("Votes", "Ascending");
  });
  it("should return all articles as default", () => {
    articlesPage.visit();
    cy.task("dbQuery", "select count(*) from articles").then((res) => {
      articlesPage.allArticles.should("have.length", res[0].count);
    });
  });
});
