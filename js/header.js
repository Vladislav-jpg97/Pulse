const header = () => {
    const badge = document.querySelector("#js-badge");
    
    const cart = JSON.parse(localStorage.getItem("cart"));
    if(cart && cart.length > 0 ){
        const totalQty = cart.reduce((s, i) => s + i.quantity, 0)
        badge.textContent = totalQty
        badge.removeAttribute("hidden")
    }else{
        badge.setAttribute("hidden",true)
    }
}
header()