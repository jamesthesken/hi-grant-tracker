var table = new Tabulator("#example-table", { 
  ajaxURL: "/data",  
  pagination: "local",
  minHeight: "100%",
  paginationSize: 10,
  placeholder:"Loading...",
  responsiveLayout:"collapse",
  layout: "fitDataFill",
  columns:[
     {formatter:"responsiveCollapse", width:30, minWidth:30, align:"center", resizable:false, headerSort:false, responsive:0},
     {title:"Deadline", field:"dueDate", sorter:"date", responsive:0, sorterParams:{format:"MM/DD/YYYY", alignEmptyValues:"bottom"},
      formatter:function(cell, formatterParams, onRendered){
        const bulmaFormatter = "<div class='columns is-centered'" + "<div class='column'>" + cell.getValue() + "</div></div>";
        if (cell.getData().isClosed === "Closed"){
          var buttonFormat = "<div class='button is-static is-light is-small is-danger is-outlined'>"
        } else {
          var buttonFormat = "<div class='button is-static is-light is-small is-success is-outlined'>"
        }
        const element = bulmaFormatter + "<div class='columns is-centered'" + "<div class='column is-full'>" + buttonFormat + cell.getData().isClosed +  "</div></div></div>";
        return element;
      }},
     {title:"Program Title", field:"title", sorter:"string", formatter:"link", width:300, formatterParams:{url: function(cell){return cell.getData().url}}, responsive:0},
     {title:"Funder", field:"funder", sorter:"string", formatter:"textarea", headerFilter:"select", width:300, headerFilterParams:{values:true}, responsive:0},
     {title:"Federal", field:"federal", sorter:"string",  align: "center", width:85, responsive:0},
     {title:"Total Funding", field:"programFunding", fomatter:"money", responsive:0},
     {title: "Last Updated", field:"lastUpdated", formatter:"textarea", responsive:2},
     {title:"Minimum Award", field:"minAward", formatter:"money", responsive:2},
     {title:"Maximum Award", field:"maxAward", formatter:"money", responsive:2},
     {title:"Description", field:"description", formatter:"textarea", width: 50, responsive:2},
     {title:"Eligible Applicants", field:"eligibility", formatter:"textarea", width: 50, responsive:2}
  ],
  initialSort:[
    {column:"Deadline", dir:"desc"}
  ],
  responsiveLayoutCollapseStartOpen:false,
  responsiveLayoutCollapseFormatter:function(data){
    //data - an array of objects containing the column title and value for each cell
    var list = document.createElement("ul");

    data.forEach(function(col){
        let item = document.createElement("li");
        // See string divider function below
        item.innerHTML = "<strong>" + col.title + "</strong> - " + stringDivider(col.value, 140, "<br/>\n" )
        list.appendChild(item);
    });

    return Object.keys(data).length ? list : "";
  },
  resizableColumns:false, // this option takes a boolean value (default = true)
});

window.addEventListener('resize', function(){
  table.redraw();
});

// Bulma Navbar toggle: https://bulma.io/documentation/components/navbar/
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

// TODO: This should really be handled by CSS, instead (for now) we are using JS to wrap the text in the table
function stringDivider(str, width, spaceReplacer) {
  if (str.length>width) {
      var p=width
      for (;p>0 && str[p]!=' ';p--) {
      }
      if (p>0) {
          var left = str.substring(0, p);
          var right = str.substring(p+1);
          return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
      }
  }
  return str;
}