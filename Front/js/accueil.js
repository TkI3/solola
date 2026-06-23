document.getElementById("btnsearch").addEventListener("click", (btn)=>{

    btn.preventDefault();
    window.location.href = `/html/main.html?search=${document.getElementById("srch_bar").value}`;
})
