const form= document.querySelector('#myForm')
const result=document.querySelector('#resultTable')
var upd



form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if (upd){
        clearTimeout(upd)
    }
 const ctype =form.elements.coinType.value;

 fetchPrice(ctype);
});

const fetchPrice=async(ctype)=>{
    const r= await axios.get((`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`))
  
    const price = r.data.coin.price;
    const vol = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const coin = r.data.coin.name;
    const curr = 'INR';
    var colour= "green";
    if(change<0){
        colour = "red";
}


    result.innerHTML = `<tr class="bg-primary" style="color: white;">
    <td>
        Property
    </td>
    <td>
        Value
    </td>
</tr>
<tr>
    <td>${coin}</td>
    <td style="color:${colour};"><span style="font-size: 1.3em;">${price}</span> ${curr}</td>
</tr>
<tr>
    <td>Volume (24hrs)</td>
    <td>${vol}</td>
</tr>
<tr>
    <td>Change (24hrs)</td>
    <td style="color:${colour};">${change} ${curr}</td>
</tr>`;
upd = setTimeout(()=>fetchPrice(ctype),10000);
};