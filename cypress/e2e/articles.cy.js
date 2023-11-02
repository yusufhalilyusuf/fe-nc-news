describe("Articles page", () => {
  it("should have sortby with date, votes and comment count options ", () => {
    cy.visit("/articles");
    cy.get("[name=sort_by] option").then((options) => {
      const actual = [...options].map((option) => {
        return option.text;
      });
      cy.log(actual);
      expect(actual).to.deep.eq(["Date", "Votes", "Comment Count"]);
    });
  });
  it("should have order ascending and descending options ", () => {
    cy.visit("/articles");
    cy.get("[name=order] option").then((options) => {
      const actual = [...options].map((option) => {
        return option.text;
      });
      cy.log(actual);
      expect(actual).to.deep.eq(["Ascending", "Descending"]);
    });
  });
  it("should have default order by date and sort ascending", () => {
    cy.visit("/articles");
    cy.get("select")
      .eq(0)
      .find("option")
      .should("have.value", "created_at")
      .and("have.attr", "selected");
    cy.get("select")
      .eq(1)
      .find("option")
      .eq(1)
      .should("have.value", "desc")
      .and("have.attr", "selected");
  });

  it("should list articles correctly ordering by date and sorting by descending", () => {
    cy.visit("/articles");
    cy.get(".article p.box:nth-child(7)").then((dates) => {
      const actual = [...dates].map((date) => {
        return date.innerText.replaceAll(/\D/gi, "");
      });
      expect(actual).to.deep.eq([...actual].sort().reverse());
    });
  });
});
