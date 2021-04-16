console.log("Starting");

const cheerio = require("cheerio");
const fs = require("fs");

let departments = [];
let sections = [];

//main()
fs.readFile("departments.json", "utf8", function (err, data) {
  if (err) throw err;
  //departments = JSON.parse(data);
  //console.log(data);
  departments = JSON.parse(data);
  //console.log(departments)
  for (d of departments) {
    parseDept(d.dept);
  }
  console.log(sections);
});

//end of main
function readhtml(dept) {
  let fileName = "./data/" + dept + ".html";
  let html = "empty string";
  console.log("fileName is ", fileName);
  html = fs.readFileSync(fileName, "utf8", function (err, data) {
    if (err) {
      throw err;
    }
  });
  return html;
}
function parseDept(dept) {
  if (dept != "HON") return;
  console.log(">>>>DEPT>>>>", dept);
  let html = readhtml(dept);
  //console.log(html);
  let $ = cheerio.load(html);
  let section = {};
  tds = $("#maincontent table tr").each((i, e) => {
    //    console.log($(e).children().first().text())
    if (e.attribs.class == "list_row") {
      console.log("FOUND: list_row");
      //initialize the section
      section = {};
      section.dept = dept;
        $(e)
            .children("td")
            .each((ii, ee) => {
                console.log("ii is", ii);
                if (ii === 0) {
                    section.crn = $(ee).text();
                    console.log("in 0", $(ee).text());
                } else if (ii == 1) {
                    section.course = $(ee).text().trim();
                    section.discipline = section.course.substring(0, 3);
                    section.href = $(ee).children("a").last().attr("href");
                } else if (ii === 2) {
                    section.sec = $(ee).text().trim();
                } else if (ii === 3) {
                    section.mode = $(ee).text();
                } else if (ii === 4) {
                    section.title = $(ee).text();
                } else if (ii === 5) {
                    section.credits = $(ee).text();
                } else if (ii === 6) {
                    section.days = $(ee).text();
                } else if (ii === 7) {
                    section.times = $(ee).text();
                } else if (ii === 8) {
                    section.room = $(ee).text().trim();
                } else if (ii === 9) {
                    section.instructor = $(ee).text().trim();
                }
        });
    } else if (e.attribs.class == "detail_row") {
      console.log("in detail.row");
        let course_enrollment = {};
        let course_messages = {};
        let course_term = {};
        let course_dates = {};
        let course_text = $(e).text();
        $
        console.log("------Course Text------")
        console.log(course_text);
        console.log("-----END COURSE TEXT---")
        let detail_cell = $(e).children('.detail_cell').first();
        console.log("DETAIL CELL:")
        $(detail_cell)
            .children()
            .each((ii, ee) => {
               console.log("detail_cell: ",ii)  
            });
        
        
        sections.push(section);
        
    }
  });

  //console.log(sections);
}
