const btn_id = 'btn_download_chrome_extension'
const action_element = document.createElement('div')
action_element.id = btn_id
action_element.innerText = 'CLICK'
document.body.appendChild(action_element);


document.querySelector(`#${btn_id}`).addEventListener("click", async function () {
  const product_list = document.querySelectorAll('.product')
  for (const product_element of product_list) {
    const product_name = product_element.querySelector('.product-title').innerText
    const product_context_href = product_element.querySelector('.absolute-link-wrapper a').href

      await fetch(product_context_href)
        .then(res => res.text())
        .then(async html_string => {
          const product_context = new DOMParser().parseFromString(html_string, 'text/html')
          const img_element_list = product_context.querySelectorAll('#product-image .thumbnail-container img')
          
          let serial_no = 1
          for (const img_element of img_element_list) {
            const img_src = img_element.attributes['data-large-img']?.nodeValue

            img_src && await fetch(img_src)
              .then(resp => resp.blob())
              .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.download = `${product_name} [${serial_no++}].jpg`;
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
              })
          }

        })
  }

})