document.addEventListener("DOMContentLoaded", () => {
  const pageTemplate = Handlebars.compile(
    document.getElementById("page-template").innerHTML
  );
  const pageHTML = pageTemplate(PageData);
  document.getElementById("page-container").innerHTML = pageHTML;
});
