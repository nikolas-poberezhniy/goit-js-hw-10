const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),o=document.querySelector("body");let d=null;function l(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}t.disabled=!0,e.addEventListener("click",(function(){o.style.backgroundColor=l(),e.disabled=!0,t.disabled=!1,d=setInterval((()=>{o.style.backgroundColor=l()}),1e3)})),t.addEventListener("click",(function(){e.disabled=!0,t.disabled=!0,clearInterval(d),e.removeAttribute("disabled"),console.log(2)}));
//# sourceMappingURL=01-color-switcher.ab96de6a.js.map
