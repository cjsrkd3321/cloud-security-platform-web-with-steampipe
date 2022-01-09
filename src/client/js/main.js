import '../scss/styles.scss';

const search = document.querySelector('input.search');

if (search) {
  const tables = document.querySelectorAll('a.table');

  search.oninput = (e) => {
    const data = Array.from(tables).filter((table) => {
      if (!table.innerText.includes(e.target.value.toUpperCase())) {
        table.style.display = 'none';
      } else {
        table.style.display = '';
      }
    });
  };
}
