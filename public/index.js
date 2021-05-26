// Custom HTTP Client example, given that we are running this code on the client-side
const grid = new gridjs.Grid({
  columns: [
    'Funder', 
    'Federal?', 
    {
      name: 'Program Title/Description',
      formatter: (_, row) => gridjs.html(`<a href='${row.cells[7].data}'>${row.cells[2].data}</a>`)
    }, 
    'Eligibility', 
    {
      name: 'Funding Info',
      sort: {compare: (a, b) => {
        const code = (x) => x.split(' ').slice(-1)[0];      
        if (code(a) > code(b)) {
          return 1;
        } else if (code(b) > code(a)) {
          return -1;
        } else {
          return 0;
        }
      }}
    }, 
    '*Due Date',
    'Total Program Funding',
    {
      name: 'URL',
      hidden: true
    }
  ],
  server: {
    url: '/data',
    data: (opts) => {
      return new Promise((resolve, reject) => {
        // let's implement our own HTTP client
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4) {
            if (this.status === 200) {
              const resp = JSON.parse(this.response);
              console.log(resp)
              // make sure the output conforms to StorageResponse format: 
              // https://github.com/grid-js/gridjs/blob/master/src/storage/storage.ts#L21-L24
              resolve({
                data: resp.map(info => [info.funder, info.federal, info.title, info.eligibility, info.amount, info.dueDate, info.programFunding, info.url ])
              });
            } else {
              reject();
            }
          }
        };
        xhttp.open("GET", opts.url, true);
        xhttp.send();
      });
    }
  },
  pagination: {
    limit: 5
  },
  search: true
}).render(document.getElementById("wrapper"));