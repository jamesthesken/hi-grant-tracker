// Custom HTTP Client example, given that we are running this code on the client-side
const grid = new gridjs.Grid({
  columns: ['Funder', 'Federal?', 'Program Title/Description', 'Eligibility', 'Funding Info', '*Due Date'],
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
                data: resp.map(info => [info.funder, info.federal, info.title, info.eligibility, info.amount, info.dueDate ])
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