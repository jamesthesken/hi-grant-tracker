var table = new Tabulator("#example-table", { 
  ajaxURL: "/data",  
  pagination: "local",
  paginationSize: 10,
  placeholder:"Loading...",
  responsiveLayout:"collapse",
  layout: "fitDataFill",
  columns:[
     {formatter:"responsiveCollapse", width:30, minWidth:30, align:"center", resizable:false, headerSort:false, responsive:0},
     {title:"Deadline", field:"dueDate", sorter:"date", responsive:0, sorterParams:{format:"MM/DD/YYYY", alignEmptyValues:"bottom"}},
     {title:"Program Title", field:"title", sorter:"string", formatter:"textarea", width:300, formatterParams:{url: function(cell){return cell.getData().url}}, responsive:0},
     {title:"Funder", field:"funder", sorter:"string", formatter:"textarea", headerFilter:"select", width:300, headerFilterParams:{values:true}, responsive:0},
     {title:"Federal", field:"federal", sorter:"string",  align: "center", width:85, responsive:0},
     {title:"Total Funding", field:"programFunding", fomatter:"money", responsive:0},
     {title: "Last Updated", field:"lastUpdated", formatter:"textarea", responsive:2},
     {title:"Minimum Award", field:"minAward", formatter:"money", responsive:2},
     {title:"Maximum Award", field:"maxAward", formatter:"money", responsive:2},
     {title:"Description", field:"description", formatter:"textarea", width: 100, responsive:2}
  ],
  responsiveLayoutCollapseStartOpen:false,
  responsiveLayoutCollapseFormatter:function(data){
    //data - an array of objects containing the column title and value for each cell
    var list = document.createElement("ul");

    data.forEach(function(col){
        let item = document.createElement("li");
        item.innerHTML = "<strong>" + col.title + "</strong> - " + col.value;
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