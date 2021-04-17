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
  //console.log(sections);
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
      /*
         There is a big blob of text in the middle of this cell that is
         not in a span.  My method of recovering it was to capture all of the text in the 
         detail_cell.  Then I recovered each of the labeled fields and replace the strings.

         What I had left was the unlabeled text.  I just trimmed it.
      */
      console.log("in detail.row");
        let course_enrollment = {};
        let course_messages = {};
        let course_term = {};
        let course_dates = {};
        let course_text = $(e)
          .text()
          .replace(/(\r\n|\n|\r)/gm, " ")
          .replace(/\s+/gm, " ")
          .replace(/Maximum Enrollment:\s*\-*\d+/gm, " ")
          .replace(/Section Seats Available:\s*\-*\d+/gm, " ")
          .replace(/\u00A0/gm, " ") //&nbsp;
          .replace(/Course Begins:\s*\d+\/\d+\/\d+/gm, " ")
          .replace(/Course Ends:\s*\d+\/\d+\/\d+/gm, " ")
          .replace(/Crosslist Seats Available:\s*\-*\d+/gm, " ")
          .trim();
        $
        console.log("------Course Text------")
        console.log(course_text);
        console.log("-----END COURSE TEXT---")
        let detail_cell = $(e).children('.detail_cell').first();
        console.log("DETAIL CELL:")
        $(detail_cell)
            .children()
            .each((ii, ee) => {
              console.log("detail_cell: ", ii)
              let detailText = $(ee).text().replace(/\s+/gm," ");
              console.log("THE DETAILTEXT IS", detailText);
              if (ii === 0) {
                console.log("In 00, should be course_enrollment", detailText)
                course_text.replace(/Maximum Enrollment:\s+\d+/, " ")
                course_text.replace(/Section Seats Avaiable:\s+\d+/," ")
                let maxEnrollment = /Maximum Enrollment:\s+(\d+)/
                let seatsAvailable = /Section Seats Available:\s+(\d+)/
                let crosslistSeats = /Crosslist Seats Available:\s+(\d+)/
                let m1 = detailText.match(maxEnrollment)
                let m2 = detailText.match(seatsAvailable)
                let m3 = detailText.match(crosslistSeats)
                let enrolled=parseInt(m1)-parseInt(m2)
                console.log("-----==1", m1[0])
                console.log("-----==2", m2[0])
                if(m3[0] !== undefined)console.log("-----==3", m3[0])
                console.log("-----==4",enrolled)
                
              } else if (ii === 1) {
                console.log("ii is 1, should be in course_messages")
                course_text.replace(detailText," ")
              } else if (ii === 2) {
                console.log("ii is 2.  It appears empty >>>",detailText,"<<<")
              } else if (ii === 3) {
                console.log("ii is 3, should be in course_term")
                course_text.replace(detailText.trim(), " ");
                course_text.replace(/Full.*Term/gm," ")  //THIS IS BAD.  BRUTE FORCE REMOVAL.  MAY MISS OTHER STRINGS!
              } else if (ii === 4) {
                console.log('ii is 4, should be in course_dates')
                course_text.replace(detailText, " ");
              } else if (ii === 5) {
                console.log("ii is 5, but I got nothin'")
              }

            });
        
      console.log("XXX------Course Text------XXX");
        
        course_text = course_text.trim()
        console.log(course_text);
      console.log("XXX-----END COURSE TEXT---XXX");
        sections.push(section);
        
    }
  });

  //console.log(sections);
}
